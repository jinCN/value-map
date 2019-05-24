const stringify = require('fast-json-stable-stringify')

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
    return super.has(stringify(key))
  }

  delete (key) {
    return super.delete(stringify(key))
  }

  set (key, value) {
    return super.set(stringify(key), value)
  }

  get (key) {
    return super.get(stringify(key))
  }
}

ValueMap.prototype[Symbol.iterator] = ValueMap.prototype.entries
module.exports = ValueMap
