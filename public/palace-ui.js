/**
 * Memory Palace UI Components
 * Provides user interface for browsing and managing the Memory Palace
 */

class PalaceUI {
    constructor(palaceManager) {
        this.manager = palaceManager;
        this.currentView = 'overview'; // overview, wings, rooms, search
        this.selectedWing = null;
        this.selectedRoom = null;
    }

    /**
     * Render the Memory Palace panel
     */
    renderPanel() {
        const panel = document.createElement('div');
        panel.id = 'memory-palace-panel';
        panel.className = 'palace-panel';
        
        panel.innerHTML = `
            <div class="palace-header">
                <h2>🏛️ Memory Palace</h2>
                <div class="palace-header-actions">
                    <button id="palace-stats-btn" class="palace-btn palace-btn-icon" title="Statistics">
                        📊
                    </button>
                    <button id="palace-export-btn" class="palace-btn palace-btn-icon" title="Export">
                        💾
                    </button>
                    <button id="palace-close-btn" class="palace-btn palace-btn-icon" title="Close">
                        ✕
                    </button>
                </div>
            </div>
            
            <div class="palace-tabs">
                <button class="palace-tab active" data-view="overview">Overview</button>
                <button class="palace-tab" data-view="wings">Wings</button>
                <button class="palace-tab" data-view="search">Search</button>
                <button class="palace-tab" data-view="storage">Storage Tools</button>
            </div>
            
            <div class="palace-content" id="palace-content">
                ${this.renderOverview()}
            </div>
        `;
        
        this.attachEventListeners(panel);
        return panel;
    }

    /**
     * Render overview tab
     */
    renderOverview() {
        const stats = this.manager.getStats();
        
        return `
            <div class="palace-overview">
                <div class="stat-card">
                    <div class="stat-icon">🏰</div>
                    <div class="stat-info">
                        <div class="stat-value">${stats.palace.wings}</div>
                        <div class="stat-label">Wings</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🚪</div>
                    <div class="stat-info">
                        <div class="stat-value">${stats.palace.rooms}</div>
                        <div class="stat-label">Rooms</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📁</div>
                    <div class="stat-info">
                        <div class="stat-value">${stats.palace.drawers}</div>
                        <div class="stat-label">Drawers</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">🌉</div>
                    <div class="stat-info">
                        <div class="stat-value">${stats.palace.tunnels}</div>
                        <div class="stat-label">Tunnels</div>
                    </div>
                </div>
                
                <div class="hall-distribution">
                    <h3>Hall Distribution</h3>
                    ${Object.entries(stats.palace.hallDistribution).map(([hall, count]) => `
                        <div class="hall-stat">
                            <span class="hall-name">${this.getHallIcon(hall)} ${this.formatHallName(hall)}</span>
                            <span class="hall-count">${count}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="memory-stack-info">
                    <h3>Memory Stack Status</h3>
                    <div class="stack-layer ${stats.stack.L0.loaded ? 'loaded' : ''}">
                        <strong>L0:</strong> Identity ${stats.stack.L0.loaded ? '✅' : '❌'}
                    </div>
                    <div class="stack-layer ${stats.stack.L1.loaded ? 'loaded' : ''}">
                        <strong>L1:</strong> Critical Facts ${stats.stack.L1.loaded ? `✅ (${stats.stack.L1.factsCount} facts)` : '❌'}
                    </div>
                    <div class="stack-layer">
                        <strong>L2:</strong> Room Recall Cache (${stats.stack.L2.cacheSize}/${stats.stack.L2.maxSize})
                    </div>
                    <div class="stack-layer">
                        <strong>L3:</strong> Deep Search Cache (${stats.stack.L3.cacheSize}/${stats.stack.L3.maxSize})
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render wings tab
     */
    renderWings() {
        const wings = Array.from(this.manager.palace.wings.values());
        
        if (wings.length === 0) {
            return `
                <div class="palace-empty">
                    <p>No wings yet. Start a conversation to create your first memory wing.</p>
                </div>
            `;
        }
        
        return `
            <div class="palace-wings">
                <div class="wings-header">
                    <h3>All Wings</h3>
                    <button id="create-wing-btn" class="palace-btn palace-btn-primary">+ New Wing</button>
                </div>
                <div class="wings-list">
                    ${wings.map(wing => `
                        <div class="wing-card" data-wing-id="${wing.id}">
                            <div class="wing-icon">🏰</div>
                            <div class="wing-info">
                                <h4>${wing.name}</h4>
                                <div class="wing-meta">
                                    <span>${wing.rooms.size} rooms</span>
                                    <span>${wing.type}</span>
                                </div>
                            </div>
                            <button class="wing-explore-btn" data-wing-id="${wing.id}">Explore →</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Render search tab
     */
    renderSearch() {
        return `
            <div class="palace-search">
                <div class="search-box">
                    <input type="text" id="palace-search-input" placeholder="Search across all memories..." />
                    <button id="palace-search-btn" class="palace-btn palace-btn-primary">Search</button>
                </div>
                
                <div class="search-filters">
                    <select id="search-hall-filter" class="palace-select">
                        <option value="">All Halls</option>
                        <option value="hall_facts">Facts</option>
                        <option value="hall_events">Events</option>
                        <option value="hall_discoveries">Discoveries</option>
                        <option value="hall_preferences">Preferences</option>
                        <option value="hall_advice">Advice</option>
                    </select>
                </div>
                
                <div id="search-results" class="search-results">
                    <p class="search-hint">Enter a search query to find memories across your palace.</p>
                </div>
            </div>
        `;
    }

    /**
     * Render storage tools tab
     */
    renderStorageTools() {
        return `
            <div class="palace-storage">
                <h3>Browser Storage Tools</h3>

                <div class="storage-tool">
                    <div class="storage-tool-header">
                        <span class="storage-tool-icon">💾</span>
                        <h4>LocalStorage</h4>
                        <button class="palace-btn palace-btn-sm" onclick="palaceUI.viewLocalStorage()">View</button>
                    </div>
                    <p>Persistent key-value storage</p>
                </div>

                <div class="storage-tool">
                    <div class="storage-tool-header">
                        <span class="storage-tool-icon">⏱️</span>
                        <h4>SessionStorage</h4>
                        <button class="palace-btn palace-btn-sm" onclick="palaceUI.viewSessionStorage()">View</button>
                    </div>
                    <p>Session-only key-value storage</p>
                </div>

                <div class="storage-tool">
                    <div class="storage-tool-header">
                        <span class="storage-tool-icon">🗄️</span>
                        <h4>IndexedDB</h4>
                        <button class="palace-btn palace-btn-sm" onclick="palaceUI.viewIndexedDB()">View</button>
                    </div>
                    <p>Structured database storage</p>
                </div>

                <div class="storage-tool">
                    <div class="storage-tool-header">
                        <span class="storage-tool-icon">🍪</span>
                        <h4>Cookies</h4>
                        <button class="palace-btn palace-btn-sm" onclick="palaceUI.viewCookies()">View</button>
                    </div>
                    <p>HTTP cookies</p>
                </div>

                <div class="storage-tool">
                    <div class="storage-tool-header">
                        <span class="storage-tool-icon">📦</span>
                        <h4>Cache Storage</h4>
                        <button class="palace-btn palace-btn-sm" onclick="palaceUI.viewCacheStorage()">View</button>
                    </div>
                    <p>Service Worker caches</p>
                </div>

                <div id="storage-viewer" class="storage-viewer"></div>
            </div>
        `;
    }

    /**
     * View LocalStorage contents
     */
    async viewLocalStorage() {
        const keys = this.manager.storage.getAllLocalStorageKeys();
        const data = keys.map(key => ({
            key,
            value: this.manager.storage.getFromLocalStorage(key)
        }));

        this.displayStorageData('LocalStorage', data);
    }

    /**
     * View SessionStorage contents
     */
    async viewSessionStorage() {
        const keys = Object.keys(sessionStorage);
        const data = keys.map(key => ({
            key,
            value: this.manager.storage.getFromSessionStorage(key)
        }));

        this.displayStorageData('SessionStorage', data);
    }

    /**
     * View IndexedDB contents
     */
    async viewIndexedDB() {
        const wings = await this.manager.storage.getAllFromIndexedDB('wings');
        const rooms = await this.manager.storage.getAllFromIndexedDB('rooms');
        const drawers = await this.manager.storage.getAllFromIndexedDB('drawers');

        this.displayStorageData('IndexedDB', {
            wings: wings.length,
            rooms: rooms.length,
            drawers: drawers.length,
            data: { wings, rooms, drawers }
        });
    }

    /**
     * View Cookies
     */
    async viewCookies() {
        const cookies = this.manager.storage.getAllCookies();
        this.displayStorageData('Cookies', cookies);
    }

    /**
     * View Cache Storage
     */
    async viewCacheStorage() {
        const cacheNames = await this.manager.storage.getAllCacheNames();
        this.displayStorageData('Cache Storage', {
            cacheCount: cacheNames.length,
            caches: cacheNames
        });
    }

    /**
     * Display storage data in viewer
     */
    displayStorageData(title, data) {
        const viewer = document.getElementById('storage-viewer');
        if (!viewer) return;

        viewer.innerHTML = `
            <div class="storage-data">
                <h4>${title}</h4>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners(panel) {
        // Tab switching
        panel.querySelectorAll('.palace-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Close button
        const closeBtn = panel.querySelector('#palace-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                panel.style.display = 'none';
            });
        }

        // Export button
        const exportBtn = panel.querySelector('#palace-export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', async () => {
                const data = await this.manager.exportAll();
                this.downloadJSON(data, 'memory-palace-export.json');
            });
        }

        // Stats button
        const statsBtn = panel.querySelector('#palace-stats-btn');
        if (statsBtn) {
            statsBtn.addEventListener('click', async () => {
                const stats = await this.manager.getStorageStats();
                alert(`Storage Usage:\n${stats.usageInMB} MB / ${stats.quotaInMB} MB (${stats.percentUsed}%)`);
            });
        }
    }

    /**
     * Switch between views
     */
    switchView(view) {
        this.currentView = view;

        // Update tabs
        document.querySelectorAll('.palace-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });

        // Update content
        const content = document.getElementById('palace-content');
        if (!content) return;

        switch (view) {
            case 'overview':
                content.innerHTML = this.renderOverview();
                break;
            case 'wings':
                content.innerHTML = this.renderWings();
                break;
            case 'search':
                content.innerHTML = this.renderSearch();
                this.attachSearchListeners();
                break;
            case 'storage':
                content.innerHTML = this.renderStorageTools();
                break;
        }
    }

    /**
     * Attach search listeners
     */
    attachSearchListeners() {
        const searchBtn = document.getElementById('palace-search-btn');
        const searchInput = document.getElementById('palace-search-input');

        const performSearch = async () => {
            const query = searchInput.value.trim();
            if (!query) return;

            const hallFilter = document.getElementById('search-hall-filter').value;
            const filters = hallFilter ? { hall: hallFilter } : {};

            const results = await this.manager.searchMemory(query, filters);
            this.displaySearchResults(results);
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    /**
     * Display search results
     */
    displaySearchResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<p class="search-no-results">No results found.</p>';
            return;
        }

        container.innerHTML = `
            <div class="search-results-list">
                ${results.map(result => `
                    <div class="search-result-item">
                        <div class="result-header">
                            <span class="result-wing">${result.wingName}</span>
                            <span class="result-room">${result.roomName}</span>
                            <span class="result-hall">${this.getHallIcon(result.hall)}</span>
                        </div>
                        <div class="result-content">
                            ${result.closetSummary || JSON.stringify(result.content).substring(0, 200)}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Utility methods
     */
    getHallIcon(hall) {
        const icons = {
            hall_facts: '📌',
            hall_events: '📅',
            hall_discoveries: '💡',
            hall_preferences: '❤️',
            hall_advice: '💬'
        };
        return icons[hall] || '📝';
    }

    formatHallName(hall) {
        return hall.replace('hall_', '').replace('_', ' ').toUpperCase();
    }

    downloadJSON(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
}

export default PalaceUI;
