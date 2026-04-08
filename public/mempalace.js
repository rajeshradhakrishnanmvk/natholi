/**
 * Memory Palace Architecture
 * Implements the hierarchical memory structure:
 * Wings → Rooms → Closets → Drawers
 * Halls (connect rooms within wings)
 * Tunnels (connect rooms across wings)
 */

class MemoryPalace {
    constructor() {
        this.wings = new Map(); // Top-level domains (persons, projects, topics)
        this.halls = this.initializeHalls(); // Memory type corridors
        this.tunnels = new Map(); // Cross-wing connections
        this.version = '3.0.0';
    }

    /**
     * Initialize the 5 standard halls (memory types)
     * These are the same in every wing
     */
    initializeHalls() {
        return {
            hall_facts: 'Decisions made, choices locked in',
            hall_events: 'Sessions, milestones, debugging',
            hall_discoveries: 'Breakthroughs, new insights',
            hall_preferences: 'Habits, likes, opinions',
            hall_advice: 'Recommendations and solutions'
        };
    }

    /**
     * Create a new wing (person, project, or topic)
     * @param {string} wingId - Unique identifier for the wing
     * @param {object} metadata - Wing metadata (name, type, created, etc.)
     */
    createWing(wingId, metadata = {}) {
        if (this.wings.has(wingId)) {
            throw new Error(`Wing ${wingId} already exists`);
        }

        const wing = {
            id: wingId,
            name: metadata.name || wingId,
            type: metadata.type || 'general', // person, project, topic
            created: Date.now(),
            rooms: new Map(), // room_name -> Room object
            metadata: metadata
        };

        this.wings.set(wingId, wing);
        return wing;
    }

    /**
     * Create a room within a wing
     * Rooms are named ideas (auth-migration, graphql-switch, etc.)
     * @param {string} wingId - Wing identifier
     * @param {string} roomName - Room name (topic/subject)
     * @param {string} hall - Which hall this room belongs to
     */
    createRoom(wingId, roomName, hall = 'hall_facts') {
        const wing = this.wings.get(wingId);
        if (!wing) {
            throw new Error(`Wing ${wingId} does not exist`);
        }

        if (!this.halls[hall]) {
            throw new Error(`Invalid hall: ${hall}`);
        }

        const roomKey = `${hall}/${roomName}`;
        
        if (wing.rooms.has(roomKey)) {
            return wing.rooms.get(roomKey); // Room already exists
        }

        const room = {
            name: roomName,
            hall: hall,
            created: Date.now(),
            closet: null, // Summary pointing to drawers
            drawers: [] // Original verbatim content
        };

        wing.rooms.set(roomKey, room);
        
        // Create tunnel if same room exists in other wings
        this.createTunnelIfNeeded(roomName, wingId, roomKey);
        
        return room;
    }

    /**
     * Add content to a drawer (original verbatim file)
     * @param {string} wingId - Wing identifier
     * @param {string} roomName - Room name
     * @param {string} hall - Hall type
     * @param {object} content - Original content to store
     */
    addToDrawer(wingId, roomName, hall, content) {
        const wing = this.wings.get(wingId);
        if (!wing) {
            throw new Error(`Wing ${wingId} does not exist`);
        }

        const roomKey = `${hall}/${roomName}`;
        let room = wing.rooms.get(roomKey);
        
        if (!room) {
            room = this.createRoom(wingId, roomName, hall);
        }

        const drawer = {
            id: this.generateId(),
            timestamp: Date.now(),
            content: content, // Original verbatim content
            metadata: content.metadata || {}
        };

        room.drawers.push(drawer);
        
        // Update closet summary
        this.updateCloset(wingId, roomKey);
        
        return drawer;
    }

    /**
     * Update the closet (summary) for a room
     * Closet points to drawer locations for fast retrieval
     */
    updateCloset(wingId, roomKey) {
        const wing = this.wings.get(wingId);
        const room = wing.rooms.get(roomKey);
        
        if (!room || room.drawers.length === 0) {
            return;
        }

        // Create summary that points to drawer locations
        room.closet = {
            summary: this.generateSummary(room.drawers),
            drawerCount: room.drawers.length,
            lastUpdated: Date.now(),
            drawerIds: room.drawers.map(d => d.id)
        };
    }

    /**
     * Generate a plain-text summary from drawers
     * (AAAK encoding will be added in future version)
     */
    generateSummary(drawers) {
        // Extract key information from all drawers
        const summaryParts = drawers.map(drawer => {
            if (typeof drawer.content === 'string') {
                return drawer.content.substring(0, 200) + '...';
            }
            return JSON.stringify(drawer.content).substring(0, 200) + '...';
        });

        return summaryParts.join('\n\n');
    }

    /**
     * Create tunnel connections between same-named rooms in different wings
     */
    createTunnelIfNeeded(roomName, wingId, roomKey) {
        const tunnelKey = roomName;

        if (!this.tunnels.has(tunnelKey)) {
            this.tunnels.set(tunnelKey, []);
        }

        const connections = this.tunnels.get(tunnelKey);
        connections.push({ wingId, roomKey });
    }

    /**
     * Search across all closets with optional filtering
     * @param {string} query - Search query
     * @param {object} filters - Optional filters (wingId, hall, room)
     */
    search(query, filters = {}) {
        const results = [];
        const queryLower = query.toLowerCase();

        for (const [wingId, wing] of this.wings) {
            // Filter by wing if specified
            if (filters.wingId && filters.wingId !== wingId) {
                continue;
            }

            for (const [roomKey, room] of wing.rooms) {
                // Filter by hall if specified
                if (filters.hall && !roomKey.startsWith(filters.hall)) {
                    continue;
                }

                // Filter by room name if specified
                if (filters.room && !roomKey.includes(filters.room)) {
                    continue;
                }

                // Search in closet summary
                if (room.closet && room.closet.summary.toLowerCase().includes(queryLower)) {
                    results.push({
                        wingId,
                        wingName: wing.name,
                        roomKey,
                        roomName: room.name,
                        hall: room.hall,
                        closetSummary: room.closet.summary,
                        drawerCount: room.drawers.length,
                        relevance: this.calculateRelevance(room.closet.summary, queryLower)
                    });
                }

                // Also search in drawer content for exact matches
                room.drawers.forEach((drawer, index) => {
                    const drawerText = typeof drawer.content === 'string'
                        ? drawer.content
                        : JSON.stringify(drawer.content);

                    if (drawerText.toLowerCase().includes(queryLower)) {
                        results.push({
                            wingId,
                            wingName: wing.name,
                            roomKey,
                            roomName: room.name,
                            hall: room.hall,
                            drawerId: drawer.id,
                            drawerIndex: index,
                            content: drawer.content,
                            relevance: this.calculateRelevance(drawerText, queryLower)
                        });
                    }
                });
            }
        }

        // Sort by relevance
        return results.sort((a, b) => b.relevance - a.relevance);
    }

    /**
     * Simple relevance calculation based on query matches
     */
    calculateRelevance(text, query) {
        const lowerText = text.toLowerCase();
        const matches = (lowerText.match(new RegExp(query, 'g')) || []).length;
        return matches;
    }

    /**
     * Get all tunnels for a specific room name
     */
    getTunnels(roomName) {
        return this.tunnels.get(roomName) || [];
    }

    /**
     * Retrieve a specific drawer by ID
     */
    getDrawer(wingId, roomKey, drawerId) {
        const wing = this.wings.get(wingId);
        if (!wing) return null;

        const room = wing.rooms.get(roomKey);
        if (!room) return null;

        return room.drawers.find(d => d.id === drawerId);
    }

    /**
     * Get memory statistics
     */
    getStats() {
        let totalRooms = 0;
        let totalDrawers = 0;
        const hallStats = {};

        for (const hall of Object.keys(this.halls)) {
            hallStats[hall] = 0;
        }

        for (const wing of this.wings.values()) {
            totalRooms += wing.rooms.size;

            for (const [roomKey, room] of wing.rooms) {
                totalDrawers += room.drawers.length;
                hallStats[room.hall]++;
            }
        }

        return {
            wings: this.wings.size,
            rooms: totalRooms,
            drawers: totalDrawers,
            tunnels: this.tunnels.size,
            hallDistribution: hallStats
        };
    }

    /**
     * Export palace data for persistence
     */
    export() {
        return {
            version: this.version,
            wings: Array.from(this.wings.entries()),
            tunnels: Array.from(this.tunnels.entries()),
            timestamp: Date.now()
        };
    }

    /**
     * Import palace data
     */
    import(data) {
        if (data.version !== this.version) {
            console.warn('Version mismatch during import');
        }

        this.wings = new Map(data.wings);
        this.tunnels = new Map(data.tunnels);
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

export default MemoryPalace;
