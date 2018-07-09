var assert = require('assert');
var LruCache = require('../');

describe('LruCache', function () {

  // @clear
  it('should clear cache', function () {
    var cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    cache.clear();
    assert.equal(cache.get('k1'), undefined);
    assert.equal(cache.get('k2'), undefined);
    assert.equal(cache.size(), 0);
  });

  // @get
  it('should get cached value', function () {
    var cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    assert.equal(cache.get('k1'), 'v1');
    assert.equal(cache.get('k2'), 'v2');

    // get will put element to head of cache
    cache.set('k1', 'v1n');
    cache.set('k3', 'v3');

    assert.equal(cache.get('k2'), undefined);
    assert.equal(cache.get('k1'), 'v1n');

    // support object key
    var key = {foo: 'bar'};
    cache.set(key, 'v');
    assert.equal(cache.get(key), 'v');
  });

  // @has
  it('should has existing value', function () {
    var cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    assert.equal(cache.has('k1'), true);
    assert.equal(cache.has('k2'), true);
    assert.equal(cache.has('k3'), false);

    // support object key
    var key = {foo: 'bar'};
    cache.set(key, 'v');
    assert.equal(cache.has(key), true);
  });

  // @remove
  it('should remove specified value', function () {
    var cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');

    cache.remove('k1');
    cache.remove('k2');

    assert.equal(cache.has('k1'), false);
    assert.equal(cache.has('k2'), false);
  });

  // @set
  it('should get cached value', function () {
    var cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    cache.set('k3', 'v3');

    assert.equal(cache.get('k1'), undefined);
    assert.equal(cache.get('k2'), 'v2');
    assert.equal(cache.get('k3'), 'v3');

    // set k2 will put k2 to head of cache
    cache.set('k2', 'v2n');
    cache.set('k4', 'v4');
    assert.equal(cache.get('k3'), undefined);
    assert.equal(cache.get('k2'), 'v2n');
    assert.equal(cache.get('k4'), 'v4');
  });

  // @size
  it('should return number of cached element', function () {
    var cache = new LruCache(10);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');

    assert.equal(cache.size(), 2);

    // shoule not excess capacity
    cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    cache.set('k3', 'v3');
    cache.set('k4', 'v4');

    assert.equal(cache.size(), 2);
  });

  // @values
  it('should return array of all cached element', function () {
    var cache = new LruCache(10);
    cache.set('k3', 'v3');
    cache.set('k2', 'v2');
    cache.set('k1', 'v1');

    var nodes = cache.values();
    assert.equal(cache.size(), nodes.length);

    for (var i = 0; i < nodes.length; i++) {
      assert.equal(nodes[i].key, 'k' + (i + 1));
      assert.equal(nodes[i].value, 'v' + (i + 1));
    }
  });

  it('should evict entries in order', function () {
    var cache = new LruCache(2);
    cache.set('k1', 'v1');
    cache.set('k2', 'v2');
    cache.get('k1');
    cache.set('k3', 'v3');
    assert.equal(cache.get('k1'), 'v1');
    assert.equal(cache.get('k2'), undefined);
    assert.equal(cache.get('k3'), 'v3');
    assert.equal(cache.size(), 2);
  });
});
