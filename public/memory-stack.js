/**
 * Memory Stack System (L0-L3)
 * 
 * L0: Identity — who is this AI? (~50 tokens, always loaded)
 * L1: Critical facts — team, projects, preferences (~120 tokens AAAK, always loaded)
 * L2: Room recall — recent sessions, current project (on demand, when topic comes up)
 * L3: Deep search — semantic query across all closets (on demand, when explicitly asked)
 */

import AAAK from './aaak.js';

class MemoryStack {
    constructor(memoryPalace, storageManager) {
        this.palace = memoryPalace;
        this.storage = storageManager;
        this.aaak = new AAAK();
        
        // Layers
        this.L0 = null; // Identity
        this.L1 = null; // Critical facts
        this.L2Cache = new Map(); // Room-based recent context
        this.L3Cache = new Map(); // Deep search cache
        
        // Configuration
        this.L0_MAX_TOKENS = 50;
        this.L1_MAX_TOKENS = 120;
        this.L2_CACHE_SIZE = 10;
        this.L3_CACHE_SIZE = 5;
    }

    /**
     * Initialize L0 - Identity layer
     */
    async initializeL0(identityData) {
        this.L0 = {
            name: identityData.name || 'AI Assistant',
            role: identityData.role || 'Helpful AI powered by Ollama',
            personality: identityData.personality || 'Friendly, helpful, and knowledgeable',
            capabilities: identityData.capabilities || [
                'Answer questions',
                'Access browser storage',
                'Remember context using Memory Palace'
            ],
            timestamp: Date.now()
        };

        // Save to localStorage
        this.storage.saveToLocalStorage('memory_stack_L0', this.L0);
        
        return this.L0;
    }

    /**
     * Initialize L1 - Critical facts layer (compressed with AAAK)
     */
    async initializeL1() {
        // Gather critical facts from all wings
        const criticalFacts = [];
        
        for (const [wingId, wing] of this.palace.wings) {
            // Get facts from hall_facts and hall_preferences
            for (const [roomKey, room] of wing.rooms) {
                if (room.hall === 'hall_facts' || room.hall === 'hall_preferences') {
                    if (room.closet) {
                        criticalFacts.push({
                            wing: wing.name,
                            room: room.name,
                            hall: room.hall,
                            summary: room.closet.summary.substring(0, 200)
                        });
                    }
                }
            }
        }

        // Compress critical facts using AAAK
        const factsText = criticalFacts.map(f => 
            `[${f.wing}/${f.room}] ${f.summary}`
        ).join('\n');

        const compressed = this.aaak.encode(factsText, {
            minEntityOccurrence: 2,
            truncateRatio: 0.8
        });

        this.L1 = {
            facts: criticalFacts,
            compressed: compressed.compressed,
            entityTable: compressed.entityTable,
            tokenEstimate: this.estimateTokens(compressed.compressed),
            timestamp: Date.now()
        };

        // Save to localStorage
        this.storage.saveToLocalStorage('memory_stack_L1', this.L1);
        
        return this.L1;
    }

    /**
     * Load L2 - Room recall (on demand)
     * @param {string} wingId - Wing to load from
     * @param {string} roomName - Room to load
     */
    async loadL2(wingId, roomName) {
        const cacheKey = `${wingId}/${roomName}`;
        
        // Check cache first
        if (this.L2Cache.has(cacheKey)) {
            return this.L2Cache.get(cacheKey);
        }

        const wing = this.palace.wings.get(wingId);
        if (!wing) return null;

        // Find all rooms matching the name across all halls
        const roomData = [];
        for (const [roomKey, room] of wing.rooms) {
            if (room.name === roomName) {
                roomData.push({
                    hall: room.hall,
                    closet: room.closet,
                    drawerCount: room.drawers.length,
                    recentDrawers: room.drawers.slice(-3) // Last 3 entries
                });
            }
        }

        const l2Data = {
            wingId,
            wingName: wing.name,
            roomName,
            rooms: roomData,
            timestamp: Date.now()
        };

        // Add to cache (with size limit)
        this.L2Cache.set(cacheKey, l2Data);
        if (this.L2Cache.size > this.L2_CACHE_SIZE) {
            const firstKey = this.L2Cache.keys().next().value;
            this.L2Cache.delete(firstKey);
        }

        return l2Data;
    }

    /**
     * Load L3 - Deep search (on demand)
     * @param {string} query - Search query
     * @param {object} filters - Optional filters
     */
    async loadL3(query, filters = {}) {
        const cacheKey = `${query}_${JSON.stringify(filters)}`;
        
        // Check cache first
        if (this.L3Cache.has(cacheKey)) {
            return this.L3Cache.get(cacheKey);
        }

        // Perform deep search across all closets
        const results = this.palace.search(query, filters);

        const l3Data = {
            query,
            filters,
            results: results.slice(0, 10), // Top 10 results
            timestamp: Date.now()
        };

        // Add to cache (with size limit)
        this.L3Cache.set(cacheKey, l3Data);
        if (this.L3Cache.size > this.L3_CACHE_SIZE) {
            const firstKey = this.L3Cache.keys().next().value;
            this.L3Cache.delete(firstKey);
        }

        return l3Data;
    }

    /**
     * Get context for AI (L0 + L1 always, L2/L3 on demand)
     */
    async getContext(options = {}) {
        const {
            includeL2 = false,
            includeL3 = false,
            wingId = null,
            roomName = null,
            searchQuery = null,
            searchFilters = {}
        } = options;

        // Always load L0 and L1
        if (!this.L0) {
            await this.loadL0();
        }
        if (!this.L1) {
            await this.initializeL1();
        }

        const context = {
            L0: this.L0,
            L1: this.L1,
            L2: null,
            L3: null,
            totalTokens: this.L0_MAX_TOKENS + this.L1.tokenEstimate
        };

        // Load L2 if requested
        if (includeL2 && wingId && roomName) {
            context.L2 = await this.loadL2(wingId, roomName);
        }

        // Load L3 if requested
        if (includeL3 && searchQuery) {
            context.L3 = await this.loadL3(searchQuery, searchFilters);
        }

        return context;
    }

    /**
     * Load L0 from storage or create new
     */
    async loadL0() {
        const stored = this.storage.getFromLocalStorage('memory_stack_L0');
        if (stored) {
            this.L0 = stored;
        } else {
            await this.initializeL0({
                name: 'Ollama Assistant',
                role: 'AI Assistant with Memory Palace',
                personality: 'Helpful, organized, and context-aware'
            });
        }
        return this.L0;
    }

    /**
     * Estimate token count (rough approximation)
     */
    estimateTokens(text) {
        // Rough estimate: ~4 characters per token
        return Math.ceil(text.length / 4);
    }

    /**
     * Clear caches
     */
    clearCaches() {
        this.L2Cache.clear();
        this.L3Cache.clear();
    }

    /**
     * Refresh L1 with latest critical facts
     */
    async refreshL1() {
        return await this.initializeL1();
    }

    /**
     * Get memory stack statistics
     */
    getStats() {
        return {
            L0: this.L0 ? {
                loaded: true,
                estimatedTokens: this.L0_MAX_TOKENS
            } : { loaded: false },
            L1: this.L1 ? {
                loaded: true,
                factsCount: this.L1.facts.length,
                estimatedTokens: this.L1.tokenEstimate,
                compressionRatio: this.L1.compressed.length / this.aaak.getStats().avgEntityLength
            } : { loaded: false },
            L2: {
                cacheSize: this.L2Cache.size,
                maxSize: this.L2_CACHE_SIZE
            },
            L3: {
                cacheSize: this.L3Cache.size,
                maxSize: this.L3_CACHE_SIZE
            }
        };
    }

    /**
     * Export memory stack for backup
     */
    export() {
        return {
            L0: this.L0,
            L1: this.L1,
            timestamp: Date.now()
        };
    }

    /**
     * Import memory stack from backup
     */
    import(data) {
        if (data.L0) this.L0 = data.L0;
        if (data.L1) this.L1 = data.L1;
    }
}

export default MemoryStack;
