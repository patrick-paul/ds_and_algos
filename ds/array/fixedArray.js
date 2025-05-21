var fixedArray = /** @class */ (function () {
    function fixedArray(size) {
        if (size === void 0) { size = 0; }
        this.length = 0;
        this.store = {};
        if (size <= 0) {
            throw new Error("Array size must be positive");
        }
        this.size = size;
    }
    fixedArray.prototype.getStoreLength = function () {
        return Object.keys(this.store).length;
    };
    fixedArray.prototype.orderTheStore = function (fromIndex) {
        var length = this.getStoreLength();
        for (var x = fromIndex; x < length; x++) {
            this.store[x] = this.store[x + 1];
        }
        delete this.store[length - 1];
        this.length--;
        return;
    };
    // Utility Features
    fixedArray.prototype.add = function (data) {
        var _currentIndex = this.length;
        if (_currentIndex >= this.size)
            return console.log("Array Out of bound!");
        this.store[_currentIndex] = data;
        this.length++;
        return;
    };
    fixedArray.prototype.get = function (index) {
        return this.store[index];
    };
    fixedArray.prototype.set = function (index, value) {
        if (index < 0 || index >= this.size)
            return console.log("Array Out of bound!");
        this.store[index] = value;
        return;
    };
    fixedArray.prototype.snatch = function () {
        var lastElementIndex = this.getStoreLength() - 1;
        if (lastElementIndex >= 0) {
            delete this.store[lastElementIndex];
            this.length--;
        }
        return;
    };
    fixedArray.prototype.remove = function (index) {
        if (this.store[index]) {
            delete this.store[index];
            this.orderTheStore(index);
        }
        return;
    };
    fixedArray.prototype.clear = function () {
        this.store = {};
        this.length = 0;
        return;
    };
    fixedArray.prototype.contains = function (data) {
        var indexObtained = undefined;
        for (var x = 0; x < this.getStoreLength(); x++) {
            // the comparison here needs NOT to be strict, to avoid issues
            if (this.store[x] == data) {
                indexObtained = x;
                break;
            }
        }
        return {
            indexObtained: indexObtained,
            isAvailable: indexObtained !== undefined,
        };
    };
    fixedArray.prototype.toArray = function () {
        return Object.values(this.store);
    };
    // Info Features
    fixedArray.prototype.isFull = function () {
        return this.getStoreLength() === this.size;
    };
    fixedArray.prototype.isEmpty = function () {
        return this.getStoreLength() === 0;
    };
    return fixedArray;
}());
