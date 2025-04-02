const { mod } = require("mathjs");

/**
 * Custom Map implementation to handle custom objects as keys. This compares 
 * with methods equals if they exist, or with the default === operator.
 */
class CustomMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    for (let [storedKey, storedValue] of this.map) {
      if (storedKey.equals && storedKey.equals(key) || storedKey === key) {
        this.map.set(storedKey, value);
        return;
      }
    }
    this.map.set(key, value);
  }

  get(key) {
    for (let [storedKey, storedValue] of this.map) {
      if (storedKey.equals && storedKey.equals(key) || storedKey === key) {
        return storedValue;
      }
    }
    return undefined;
  }


  has(key) {
    for (let storedKey of this.map.keys()) {
      if (storedKey.equals && storedKey.equals(key) || storedKey === key) {
        return true;
      }
    }
    return false;
  }


  delete(key) {
    for (let storedKey of this.map.keys()) {
      if (storedKey.equals && storedKey.equals(key) || storedKey === key) {
        this.map.delete(storedKey);
        return true;
      }
    }
    return false;
  }
}

module.exports = { CustomMap };
