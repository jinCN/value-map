const stringify = require('fast-json-stable-stringify')

function guardStringify (key) {
  if (key && typeof key === 'object') {
  } else {
    throw new Error('[value-map] key must be object')
  }
  return stringify(key)
}

class ValueMap extends Map {
  * entries () {
    for (let [k, v] of super.entries()) {
      yield [JSON.parse(k), v]
    }
  }

  forEach (callback, thisArg) {
    for (let [k, v] of this) {
      callback.call(thisArg, v, k, this)
    }
  }

  * keys () {
    for (let k of super.keys()) {
      yield JSON.parse(k)
    }
  }

  has (key) {
    return super.has(guardStringify(key))
  }

  delete (key) {
    return super.delete(guardStringify(key))
  }

  set (key, value) {
    return super.set(guardStringify(key), value)
  }

  get (key) {
    return super.get(guardStringify(key))
  }
}

ValueMap.prototype[Symbol.iterator] = ValueMap.prototype.entries
module.exports = ValueMap
