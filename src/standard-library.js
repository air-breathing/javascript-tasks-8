'use strict';

var Collection = function ()  {
        this.type = 'collection';
        this.first = null;
        this.last = null;
        this._data = [];
        this.length = 0;
        this.isEmpty = true;
};

Collection.prototype = Object.create(Object.prototype);

Collection.prototype.pickFirst = function () {
    if (this.length > 0) {
        this.length -= 1;
        this.isEmpty = this.length == 0;
        this.first = this.isEmpty ? null : this._data[1];
        this.last = this.isEmpty ? null : this.last;
        return this._data.splice(0, 1)[0];
    } else {
        return undefined;
    }
};
Collection.prototype.pickLast = function () {
    if (this.length > 0) {
        this.length -= 1;
        this.isEmpty = this.length == 0;
        this.first = this.isEmpty ? null : this.first;
        this.last = this.isEmpty ? null : this._data[this.length - 1];
        return this._data.pop()
    } else {
        return undefined;
    }
};

Collection.prototype.pickSome = function (index) {
    if (index == 0) {
        this.pickFirst();
    } else {
        if (index == this.length) {
            this.pickLast();
        } else {
            if (this.length > index && index > 0) {
                this._data.splice(index, 1);
                this.length -= 1;
                this.isEmpty = this.length == 0;
            }
        }
    }
};
Collection.prototype.insertFirst = function (elem) {
    this._data.splice(0, 0, elem);
    this.length += 1;
    this.last = this.isEmpty ? elem : this.last;
    this.isEmpty = false;
    this.first = elem;
};
Collection.prototype.insertLast = function (elem) {
    this._data.push(elem);
    this.length += 1;
    this.first = this.isEmpty ? elem : this.first;
    this.isEmpty = false;
    this.last = elem;
};

Collection.prototype.empty = function () {
    this._data = [];
    this.length = 0;
    this.isEmpty = true;
    this.first = null;
    this.last = null;
};

Collection.prototype.toString = function () {
    return this._data.toString();
};

var Queue = function () {
    Collection.call(this);
};

Queue.prototype = Object.create(Collection.prototype);

Queue.prototype.enqueue =  function (item) {
    this.insertLast(item);
};

Queue.prototype.dequeue = function () {
    return this.pickFirst();
};

var FixedArray = function (size) {
    this._data = new Array(size);
    this.length = size;
};

FixedArray.prototype = Object.create(Object.prototype);

FixedArray.prototype.insertAt = function (index, item) {
    if (index >= this.length || index < 0) {
        throw RangeError;
    }
    this._data[index] = item;
};

FixedArray.prototype.getAt = function (index) {
    if (index >= this.length || index < 0) {
        throw RangeError;
    }
    return this._data[index];
};
//использовать toString, чтобы сделать ключом
var Set = function () {
    Collection.call(this);
};

Set.prototype = Object.create(Collection.prototype);

Set.prototype.insert =  function (item) {
    var elemInData = this._data.find(
        function (elem) {
            return elem === item;
        }
    );
    if (elemInData == undefined) {
        this.insertLast(item);
    }
};

Set.prototype.remove = function (item) {
    var indexElemInData = this._data.findIndex(
        function (elem) {
            return elem === item;
        }
    );
    if (indexElemInData != -1) {
        this.pickSome(indexElemInData);
    }
};

Set.prototype.has = function (item) {
    var indexElemInData = this._data.findIndex(
        function (elem) {
            return elem === item;
        }
    );
    return indexElemInData != -1;
};

Set.prototype.intersect = function (other) {
    var newSet = new Set();
    this._data.forEach(
        function (elem) {
            if (other.has(elem)) {
                newSet.insert(elem);
            }
        }
    )
    return newSet;
};

Set.prototype.union = function (other) {
    var newSet = new Set();
    this._data.forEach(
        function (elem) {
            newSet.insert(elem);
        }
    );
    other._data.forEach(
        function (elem) {
            newSet.insert(elem)
        }
    );
    return newSet;
};


exports.Collection = Collection;
exports.Queue = Queue;
exports.FixedArray = FixedArray;
exports.Set = Set;
