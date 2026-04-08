/**
 * Memory Palace Manager
 * Main integration module that brings together all Memory Palace components
 */

import MemoryPalace from './mempalace.js';
import StorageManager from './storage-manager.js';
import MemoryStack from './memory-stack.js';
import AAAK from './aaak.js';

class PalaceManager {
    constructor() {
        this.palace = new MemoryPalace();
        this.storage = new StorageManager();
        this.stack = new MemoryStack(this.palace, this.storage);
        this.aaak = new AAAK();
        this.initialized = false;
    }

    /**
     * Initialize the Memory Palace system
     */
    async initialize() {
        if (this.initialized) return;

        try {
            // Initialize IndexedDB
            await this.storage.initIndexedDB();

            // Load existing palace data
            await this.loadPalaceData();

            // Initialize memory stack
            await this.stack.loadL0();
            await this.stack.initializeL1();

            this.initialized = true;
            console.log('✅ Memory Palace initialized');
            console.log('📊 Stats:', this.getStats());
        } catch (error) {
            console.error('Failed to initialize Memory Palace:', error);
            throw error;
        }
    }

    /**
     * Load palace data from storage
     */
    async loadPalaceData() {
        // Try to load from IndexedDB first
        const wings = await this.storage.getAllFromIndexedDB('wings');
        
        if (wings && wings.length > 0) {
            wings.forEach(wingData => {
                this.palace.wings.set(wingData.id, wingData);
            });
            console.log(`Loaded ${wings.length} wings from storage`);
        } else {
            // Try localStorage as fallback
            const palaceData = this.storage.getFromLocalStorage('memory_palace_data');
            if (palaceData) {
                this.palace.import(palaceData);
                console.log('Loaded palace data from localStorage');
            }
        }
    }

    /**
     * Save palace data to storage
     */
    async savePalaceData() {
        const palaceData = this.palace.export();
        
        // Save to both IndexedDB and localStorage for redundancy
        this.storage.saveToLocalStorage('memory_palace_data', palaceData);
        
        // Save wings to IndexedDB
        for (const [wingId, wing] of this.palace.wings) {
            await this.storage.saveToIndexedDB('wings', wing);
        }
    }

    /**
     * Add a conversation to memory
     */
    async addConversation(wingId, roomName, hall, message) {
        // Ensure wing exists
        if (!this.palace.wings.has(wingId)) {
            this.palace.createWing(wingId, {
                name: wingId,
                type: 'conversation'
            });
        }

        // Add to drawer
        const drawer = this.palace.addToDrawer(wingId, roomName, hall, {
            role: message.role,
            content: message.content,
            timestamp: Date.now(),
            metadata: message.metadata || {}
        });

        // Save to storage
        await this.savePalaceData();

        // Refresh L1 if this is a critical fact
        if (hall === 'hall_facts' || hall === 'hall_preferences') {
            await this.stack.refreshL1();
        }

        return drawer;
    }

    /**
     * Search memory palace
     */
    async searchMemory(query, filters = {}) {
        return this.palace.search(query, filters);
    }

    /**
     * Get context for AI
     */
    async getAIContext(options = {}) {
        return await this.stack.getContext(options);
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            palace: this.palace.getStats(),
            stack: this.stack.getStats(),
            storage: null // Will be populated async
        };
    }

    /**
     * Get storage statistics
     */
    async getStorageStats() {
        return await this.storage.getStorageEstimate();
    }

    /**
     * Export all data
     */
    async exportAll() {
        return {
            palace: this.palace.export(),
            stack: this.stack.export(),
            storage: await this.storage.exportAllData(),
            timestamp: Date.now()
        };
    }

    /**
     * Import data
     */
    async importAll(data) {
        if (data.palace) {
            this.palace.import(data.palace);
        }
        if (data.stack) {
            this.stack.import(data.stack);
        }
        await this.savePalaceData();
    }

    /**
     * Clear all memory
     */
    async clearAll() {
        if (confirm('Are you sure you want to clear all memory? This cannot be undone.')) {
            this.palace = new MemoryPalace();
            this.stack = new MemoryStack(this.palace, this.storage);
            await this.savePalaceData();
            this.stack.clearCaches();
            console.log('Memory Palace cleared');
        }
    }
}

// Create global instance
const palaceManager = new PalaceManager();

export default palaceManager;
