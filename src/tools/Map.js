class Map{

    constructor(){
        this.map = {};
    }

    /**
     * Determines if the map has a value based on a key.
     * @param {string} key Key to check.
     * @returns {boolean} If they key exists or not.
     */
    hasKey(key){
        return typeof key === "string" && key.length > 0 ? this.map.hasOwnProperty(key) : false;
    }

    /**
     * Gets a particular item by key.
     * @param {string} key Key to get by.
     * @returns {any} Any value you put in the map.
     */
    get(key){
        let item = null;
        if(this.hasKey(key)){
            item = this.map[key];
        }
        return item;
    }

    /**
     * Adds an item to the map.
     * @param {string} key The identifier.
     * @param {any} value The item.
     * @returns {boolean} If added or not.
     */
    add(key, value){
        let added = false;

        if(!this.hasKey(key) && value !== undefined & value !== null){
            this.map[key] = value;
            added = this.map[key] === value;
        }

        return added;
    }

    /**
     * Removes an item from the map.
     * @param {string} key Key to remove.
     * @returns {boolean} If removed.
     */
    remove(key){
        let removed = false;

        if(this.hasKey(key)){
            delete map[key];
            removed = map[key] === undefined;
        }

        return removed;
    }

    /**
     * 
     * @param {string} key The key to update.
     * @param {any} value The new value.
     * @returns {boolean} If it updated.
     */
    update(key, value){
        let updated = false;

        if(this.hasKey(key)){
            this.map[key] = value;
            updated = this.map[key] === value;
        }

        return updated;
    }

}

module.exports = Map;