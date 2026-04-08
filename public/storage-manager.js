/**
 * Browser Storage Manager
 * Integrates the 5 browser DevTools Application Tab storage tools:
 * 1. Local Storage
 * 2. Session Storage
 * 3. IndexedDB
 * 4. Cookies
 * 5. Cache Storage
 */

class StorageManager {
    constructor() {
        this.dbName = 'MemoryPalaceDB';
        this.dbVersion = 1;
        this.db = null;
    }

    /**
     * Initialize IndexedDB
     */
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object stores for Memory Palace
                if (!db.objectStoreNames.contains('wings')) {
                    db.createObjectStore('wings', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('rooms')) {
                    const roomStore = db.createObjectStore('rooms', { keyPath: 'id', autoIncrement: true });
                    roomStore.createIndex('wingId', 'wingId', { unique: false });
                    roomStore.createIndex('roomName', 'roomName', { unique: false });
                }
                if (!db.objectStoreNames.contains('drawers')) {
                    const drawerStore = db.createObjectStore('drawers', { keyPath: 'id', autoIncrement: true });
                    drawerStore.createIndex('roomId', 'roomId', { unique: false });
                    drawerStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    // ==================== LOCAL STORAGE ====================

    /**
     * Save to localStorage
     */
    saveToLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return false;
        }
    }

    /**
     * Get from localStorage
     */
    getFromLocalStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return null;
        }
    }

    /**
     * Remove from localStorage
     */
    removeFromLocalStorage(key) {
        localStorage.removeItem(key);
    }

    /**
     * Clear all localStorage
     */
    clearLocalStorage() {
        localStorage.clear();
    }

    /**
     * Get all localStorage keys
     */
    getAllLocalStorageKeys() {
        return Object.keys(localStorage);
    }

    // ==================== SESSION STORAGE ====================

    /**
     * Save to sessionStorage
     */
    saveToSessionStorage(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('SessionStorage error:', error);
            return false;
        }
    }

    /**
     * Get from sessionStorage
     */
    getFromSessionStorage(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('SessionStorage error:', error);
            return null;
        }
    }

    /**
     * Remove from sessionStorage
     */
    removeFromSessionStorage(key) {
        sessionStorage.removeItem(key);
    }

    /**
     * Clear all sessionStorage
     */
    clearSessionStorage() {
        sessionStorage.clear();
    }

    // ==================== INDEXED DB ====================

    /**
     * Save to IndexedDB
     */
    async saveToIndexedDB(storeName, data) {
        if (!this.db) {
            await this.initIndexedDB();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get from IndexedDB
     */
    async getFromIndexedDB(storeName, key) {
        if (!this.db) {
            await this.initIndexedDB();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all from IndexedDB store
     */
    async getAllFromIndexedDB(storeName) {
        if (!this.db) {
            await this.initIndexedDB();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete from IndexedDB
     */
    async deleteFromIndexedDB(storeName, key) {
        if (!this.db) {
            await this.initIndexedDB();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear IndexedDB store
     */
    async clearIndexedDBStore(storeName) {
        if (!this.db) {
            await this.initIndexedDB();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ==================== COOKIES ====================

    /**
     * Set cookie
     */
    setCookie(name, value, days = 365) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;
        document.cookie = `${name}=${cookieValue};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    /**
     * Get cookie
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                const value = cookie.substring(nameEQ.length, cookie.length);
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            }
        }
        return null;
    }

    /**
     * Delete cookie
     */
    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    /**
     * Get all cookies
     */
    getAllCookies() {
        const cookies = {};
        const cookieArray = document.cookie.split(';');

        cookieArray.forEach(cookie => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            if (name) {
                try {
                    cookies[name] = JSON.parse(value);
                } catch {
                    cookies[name] = value;
                }
            }
        });

        return cookies;
    }

    // ==================== CACHE STORAGE ====================

    /**
     * Save to Cache Storage
     */
    async saveToCache(cacheName, url, response) {
        try {
            const cache = await caches.open(cacheName);
            await cache.put(url, response);
            return true;
        } catch (error) {
            console.error('Cache Storage error:', error);
            return false;
        }
    }

    /**
     * Get from Cache Storage
     */
    async getFromCache(cacheName, url) {
        try {
            const cache = await caches.open(cacheName);
            return await cache.match(url);
        } catch (error) {
            console.error('Cache Storage error:', error);
            return null;
        }
    }

    /**
     * Delete from Cache Storage
     */
    async deleteFromCache(cacheName, url) {
        try {
            const cache = await caches.open(cacheName);
            return await cache.delete(url);
        } catch (error) {
            console.error('Cache Storage error:', error);
            return false;
        }
    }

    /**
     * Get all cache names
     */
    async getAllCacheNames() {
        try {
            return await caches.keys();
        } catch (error) {
            console.error('Cache Storage error:', error);
            return [];
        }
    }

    /**
     * Delete entire cache
     */
    async deleteCache(cacheName) {
        try {
            return await caches.delete(cacheName);
        } catch (error) {
            console.error('Cache Storage error:', error);
            return false;
        }
    }

    // ==================== UTILITY METHODS ====================

    /**
     * Get storage quota and usage
     */
    async getStorageEstimate() {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            return {
                quota: estimate.quota,
                usage: estimate.usage,
                usageInMB: (estimate.usage / (1024 * 1024)).toFixed(2),
                quotaInMB: (estimate.quota / (1024 * 1024)).toFixed(2),
                percentUsed: ((estimate.usage / estimate.quota) * 100).toFixed(2)
            };
        }
        return null;
    }

    /**
     * Export all storage data
     */
    async exportAllData() {
        return {
            localStorage: this.getAllLocalStorageKeys().reduce((acc, key) => {
                acc[key] = this.getFromLocalStorage(key);
                return acc;
            }, {}),
            sessionStorage: Object.keys(sessionStorage).reduce((acc, key) => {
                acc[key] = this.getFromSessionStorage(key);
                return acc;
            }, {}),
            cookies: this.getAllCookies(),
            indexedDB: {
                wings: await this.getAllFromIndexedDB('wings'),
                rooms: await this.getAllFromIndexedDB('rooms'),
                drawers: await this.getAllFromIndexedDB('drawers')
            },
            caches: await this.getAllCacheNames(),
            storageEstimate: await this.getStorageEstimate()
        };
    }
}

export default StorageManager;
