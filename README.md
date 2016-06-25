>A simple LRU cache for nodejs or browser

# Install

    $ npm install --save lru-cache-map

# Usage

```javascript
var LruCache = require('lru-cache-map');

var cache = new LruCache(3);    // max capacity for cached elements

cache.set('key', 'value');
cache.get('key'); // => 'value'

var key = {foo: 'bar'}; // support object key
cache.set(key, 'v');
assert.equal(cache.get(key), 'v');

cache.has('key'); // true

cache.size(); // 2

cache.remove('key'); // remove value in cache

cache.clear();    // clear all elements in the cache
```

# API
* new LruCache(capacity)
    
    capacity: max number of elements in cache. LRU element will be pruned when size exceeds capcity.
    
* `set(key, value)`
* `get(key) => value`

    These two apis will update the position of the element to the 'recently used' position.
    
    If the key is not found, `get()` will return `undefined`.

    You can use any type of value for key and value.
    
    But `undefined` is not recommended.

* `clear()`

    Clear the cache, all elements will be removed.

* `has(key)`

    Check if the key is in the cache.

* `remove(key)`

    Remove value of specified key from the cache.

* `size()`

    Number of element in the cache. Should <= capacity

* `values()`

    Returns the  Returns an array of the key-value pairs in cache.


# License
`MIT`