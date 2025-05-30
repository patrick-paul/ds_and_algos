var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    fixedArray.prototype.getFirst = function () {
        var firstElement = this.store[0];
        return firstElement ? firstElement : undefined;
    };
    fixedArray.prototype.getLast = function () {
        return this.length > 0 ? this.store[this.length - 1] : undefined;
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
            var removed = this.store[lastElementIndex];
            delete this.store[lastElementIndex];
            this.length--;
            return removed;
        }
        return undefined;
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
    fixedArray.prototype.printItems = function () {
        for (var key in this.store) {
            console.log(this.store[key]);
        }
        return;
    };
    // Making the fixed array iterable
    fixedArray.prototype[Symbol.iterator] = function () {
        var x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x = 0;
                    _a.label = 1;
                case 1:
                    if (!(x < this.getStoreLength())) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.store[x]];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    x++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    // Iterables Features
    fixedArray.prototype.forEvery = function (iterableFunction) {
        for (var x = 0; x < this.getStoreLength(); x++) {
            iterableFunction(this.store[x]);
        }
        return;
    };
    fixedArray.prototype.map = function (iterableFunction) {
        var modifiedFixedArray = new fixedArray(this.size);
        for (var x = 0; x < this.getStoreLength(); x++) {
            var modifiedElement = iterableFunction(this.store[x]);
            modifiedFixedArray.add(modifiedElement);
        }
        return modifiedFixedArray;
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
var newFixedArray = new fixedArray(5);
newFixedArray.add(1);
newFixedArray.add(2);
newFixedArray.add(3);
newFixedArray.add(4);
newFixedArray.add(5);
newFixedArray.printItems();
newFixedArray.forEvery(function (element) {
    return element * 2;
});
newFixedArray.printItems();
