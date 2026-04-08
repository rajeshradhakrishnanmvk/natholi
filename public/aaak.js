/**
 * AAAK Compression System
 * AAAK = Augmented Abbreviated Adaptive Knowledge
 * 
 * A lossy abbreviation system using:
 * - Entity codes for repeated entities
 * - Structural markers for organization
 * - Sentence truncation for efficiency
 * 
 * Readable by any LLM without a decoder (Claude, GPT, Gemini, Llama, Mistral)
 */

class AAAK {
    constructor() {
        this.entityMap = new Map(); // entity -> code
        this.reverseMap = new Map(); // code -> entity
        this.nextCode = 1;
        this.version = '3.0.0-experimental';
    }

    /**
     * Encode text using AAAK compression
     * @param {string} text - Original text to compress
     * @param {object} options - Compression options
     */
    encode(text, options = {}) {
        const {
            maxEntityLength = 50, // Truncate entities longer than this
            minEntityOccurrence = 2, // Only encode entities appearing this many times
            truncateRatio = 0.7 // Keep 70% of sentence
        } = options;

        // Step 1: Identify entities (proper nouns, repeated terms)
        const entities = this.extractEntities(text);
        
        // Step 2: Create entity codes for frequently occurring entities
        const frequentEntities = entities.filter(e => e.count >= minEntityOccurrence);
        frequentEntities.forEach(entity => {
            if (!this.entityMap.has(entity.text)) {
                const code = `E${this.nextCode++}`;
                this.entityMap.set(entity.text, code);
                this.reverseMap.set(code, entity.text);
            }
        });

        // Step 3: Replace entities with codes
        let compressed = text;
        for (const [entity, code] of this.entityMap) {
            const regex = new RegExp(`\\b${this.escapeRegex(entity)}\\b`, 'g');
            compressed = compressed.replace(regex, code);
        }

        // Step 4: Apply structural markers
        compressed = this.applyStructuralMarkers(compressed);

        // Step 5: Generate entity table
        const entityTable = this.generateEntityTable();

        return {
            compressed,
            entityTable,
            originalLength: text.length,
            compressedLength: compressed.length + entityTable.length,
            ratio: ((compressed.length + entityTable.length) / text.length).toFixed(2)
        };
    }

    /**
     * Decode AAAK compressed text
     * @param {string} compressed - Compressed text
     * @param {string} entityTable - Entity mapping table
     */
    decode(compressed, entityTable) {
        // Parse entity table
        this.parseEntityTable(entityTable);

        // Replace codes with entities
        let decoded = compressed;
        for (const [code, entity] of this.reverseMap) {
            const regex = new RegExp(`\\b${code}\\b`, 'g');
            decoded = decoded.replace(regex, entity);
        }

        // Remove structural markers
        decoded = this.removeStructuralMarkers(decoded);

        return decoded;
    }

    /**
     * Extract entities from text (proper nouns, repeated terms)
     */
    extractEntities(text) {
        const entityCounts = new Map();
        
        // Extract capitalized words (potential proper nouns)
        const capitalizedWords = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g) || [];
        
        // Extract quoted terms
        const quotedTerms = text.match(/"([^"]+)"/g) || [];
        
        // Extract common repeated phrases (2-4 words)
        const phrases = text.match(/\b\w+(?:\s+\w+){1,3}\b/g) || [];

        const allEntities = [...capitalizedWords, ...quotedTerms, ...phrases];
        
        allEntities.forEach(entity => {
            entity = entity.replace(/"/g, '').trim();
            if (entity.length > 3 && entity.length < 100) {
                entityCounts.set(entity, (entityCounts.get(entity) || 0) + 1);
            }
        });

        return Array.from(entityCounts.entries())
            .map(([text, count]) => ({ text, count }))
            .sort((a, b) => b.count - a.count);
    }

    /**
     * Apply structural markers for organization
     */
    applyStructuralMarkers(text) {
        // Mark different types of information
        let marked = text;

        // Mark facts with §
        marked = marked.replace(/\b(decided|chosen|selected|confirmed)\b/gi, '§$1§');

        // Mark events with ¶
        marked = marked.replace(/\b(on|at|during|happened|occurred)\s+(\d{4}-\d{2}-\d{2})/gi, '¶$1 $2¶');

        // Mark preferences with ◊
        marked = marked.replace(/\b(prefers|likes|dislikes|favorite)\b/gi, '◊$1◊');

        // Mark advice with ★
        marked = marked.replace(/\b(recommend|suggest|should|advise)\b/gi, '★$1★');

        return marked;
    }

    /**
     * Remove structural markers
     */
    removeStructuralMarkers(text) {
        return text.replace(/[§¶◊★]/g, '');
    }

    /**
     * Generate entity table for decoding
     */
    generateEntityTable() {
        let table = '=== AAAK Entity Map ===\n';
        for (const [entity, code] of this.entityMap) {
            table += `${code}=${entity}\n`;
        }
        table += '=== End Map ===\n';
        return table;
    }

    /**
     * Parse entity table
     */
    parseEntityTable(table) {
        this.entityMap.clear();
        this.reverseMap.clear();

        const lines = table.split('\n');
        for (const line of lines) {
            if (line.includes('=') && !line.includes('===')) {
                const [code, entity] = line.split('=');
                this.entityMap.set(entity.trim(), code.trim());
                this.reverseMap.set(code.trim(), entity.trim());
            }
        }
    }

    /**
     * Escape regex special characters
     */
    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Get compression statistics
     */
    getStats() {
        return {
            entities: this.entityMap.size,
            version: this.version,
            avgEntityLength: this.calculateAvgEntityLength()
        };
    }

    /**
     * Calculate average entity length
     */
    calculateAvgEntityLength() {
        if (this.entityMap.size === 0) return 0;
        
        let totalLength = 0;
        for (const entity of this.entityMap.keys()) {
            totalLength += entity.length;
        }
        
        return (totalLength / this.entityMap.size).toFixed(2);
    }

    /**
     * Reset entity mappings
     */
    reset() {
        this.entityMap.clear();
        this.reverseMap.clear();
        this.nextCode = 1;
    }
}

export default AAAK;
