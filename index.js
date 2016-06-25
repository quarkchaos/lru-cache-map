
/**
 * Least Recently Used Cache. Use a map and a double linked list to store key-value pair.
 * 
 * @param {number} capacity -- max capacity of cache
 * 
 */
/*
 * <br/> key-value pair is stored as following type of object:
 * <br/> {
 * <br/>    key: <any>,
 * <br/>    value: <any>,
 * <br/>    prev: <node>, // Previous node in the linked list
 * <br/>    next: <node>, // Next node in the linked list
 * <br/> }
 */
function LruCache(capacity) {

  // max size of cache
  this._capacity = typeof capacity == 'number' ? capacity : 100;

  // head of linked list, when set or get, the node will be inserted to head
  this._head = null;

  // tail of linked list, when capacity is full, the tail node will be removed
  this._tail = null;

  // this._size of key-value pair in cache
  this._size = 0;

  // map of cache, used to check and get an value in O(1)
  this._cache = {};
}

function Node(key, value, prev, next) {
  this.key = key;
  this.value = value;
  this.prev = prev;
  this.next = next;
}

/**
 * Removes all of the elements from the cache.
 * 
 */
LruCache.prototype.clear = function () {
  this._cache = {};
  this._head = null;
  this._tail = null;
  this._size = 0;
};

/**
 * Returns the value to which the specified key is mapped, or 'undefined' if cache contains no mapping for the key.
 * 
 * @param {any} key  -- key of value
 * @return cache value mapped with this key
 * 
 */
LruCache.prototype.get = function (key) {
  if (this.has(key)) {
    var node = this._cache[key];

    this._unlink(node);
    this._insertHead(node);

    return node.value;
  }
};

/**
 * Check if the cache contains the value of specified key
 * 
 * @param {any} key
 * @return true or false
 * 
 */
LruCache.prototype.has = function (key) {
  return this._cache.hasOwnProperty(key);
};

/**
 * Remove value of specified key from the cache
 * 
 * @param {any} key
 * @return value of this key if successfully removed
 * 
 */
LruCache.prototype.remove = function (key) {
  if (this.has(key)) {
    var node = this._cache[key];
    this._unlink(node);
    delete this._cache[key];
    return node.value;
  }
};

/**
 * Add an value with specified key into cache. If it exists, the value will be updated.
 * 
 * @param {any} key  -- key of value
 * @param {any} value
 * 
 */
LruCache.prototype.set = function (key, value) {
  if (this._capacity <= 0) {
    return;
  }

  var node;

  if (this.has(key)) {
    node = this._cache[key];
    this._unlink(node);
    node.value = value;
  } else {
    if (this._size + 1 > this._capacity) {
      delete this._cache[this._tail.key];
      this._unlink(this._tail);
    } else {
      this._size++;
    }
    node = new Node(key, value, null, null);
    this._cache[key] = node;
  }

  this._insertHead(node);
  
  return node.value;
};

/**
 * Returns the number of elements in cache.
 * 
 * @return Returns the number of elements in cache.
 * 
 */
LruCache.prototype.size = function () {
  return this._size;
};

/**
 * Returns the  Returns an array of the key-value pairs in cache.
 * 
 * @return Returns the  Returns an array of the key-value pairs in cache.
 * 
 */
LruCache.prototype.values = function () {
  var nodes = [];

  node = this._head;
  while (node) {
    nodes.push({
      key: node.key,
      value: node.value
    });
    node = node.next;
  }
  
  return nodes;
};


// Remove a node from linked list, not removed from cache map
LruCache.prototype._unlink = function (node) {
  if (node.prev) {
    node.prev.next = node.next;
  } else {
    this._head = node.next;
  }
  if (node.next) {
    node.next.prev = node.prev;
  } else {
    this._tail = node.prev;
  }
};

// Insert a node to the head of linked list
LruCache.prototype._insertHead = function (node) {
  node.prev = null;
  node.next = this._head;

  if (this._head != null) {
    this._head.prev = node;
  }
  this._head = node;

  if (this._tail == null) {
    this._tail = node;
  }
};

// Export interfaces
if (typeof module != 'undefined') {
  module.exports = LruCache
}
