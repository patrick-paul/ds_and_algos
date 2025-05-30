type storeType<T> = Record<number, T>;
type indexAndBoolean = {
  indexObtained: number | undefined;
  isAvailable: boolean;
};

type iterableFunction<T> = (element: T) => T;
type transformFunction<T, U = T> = (element: T) => U;

class fixedArray<T> {
  length: number = 0;
  private size: number;
  private store: storeType<T> = {};

  constructor(size: number = 0) {
    if (size <= 0) {
      throw new Error("Array size must be positive");
    }

    this.size = size;
  }

  private getStoreLength(): number {
    return Object.keys(this.store).length;
  }

  private orderTheStore(fromIndex: number) {
    const length = this.getStoreLength();

    for (let x = fromIndex; x < length; x++) {
      this.store[x] = this.store[x + 1];
    }

    delete this.store[length - 1];
    this.length--;
    return;
  }

  // Utility Features
  add(data: T): void {
    const _currentIndex = this.length;
    if (_currentIndex >= this.size) return console.log("Array Out of bound!");
    this.store[_currentIndex] = data;
    this.length++;
    return;
  }

  get(index: number): T | undefined {
    return this.store[index];
  }

  getFirst(): T | undefined {
    const firstElement = this.store[0];
    return firstElement ? firstElement : undefined;
  }

  getLast(): T | undefined {
    return this.length > 0 ? this.store[this.length - 1] : undefined;
  }

  set(index: number, value: T): void {
    if (index < 0 || index >= this.size)
      return console.log("Array Out of bound!");
    this.store[index] = value;
    return;
  }

  snatch(): T | undefined {
    const lastElementIndex = this.getStoreLength() - 1;
    if (lastElementIndex >= 0) {
      const removed = this.store[lastElementIndex];
      delete this.store[lastElementIndex];
      this.length--;
      return removed;
    }

    return undefined;
  }

  remove(index: number): void {
    if (this.store[index]) {
      delete this.store[index];
      this.orderTheStore(index);
    }

    return;
  }

  clear(): void {
    this.store = {};
    this.length = 0;
    return;
  }

  contains(data: T): indexAndBoolean {
    let indexObtained: undefined | number = undefined;

    for (let x = 0; x < this.getStoreLength(); x++) {
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
  }

  toArray(): Array<T> {
    return Object.values(this.store);
  }

  printItems(): void {
    for (const key in this.store) {
      console.log(this.store[key]);
    }

    return;
  }

  // Making the fixed array iterable
  *[Symbol.iterator]() {
    for (let x = 0; x < this.getStoreLength(); x++) {
      yield this.store[x];
    }

    return;
  }

  // Iterables Features
  forEvery(iterableFunction: iterableFunction<T>): void {
    for (let x = 0; x < this.getStoreLength(); x++) {
      iterableFunction(this.store[x]);
    }

    return;
  }

  map<U>(iterableFunction: transformFunction<T, U>): fixedArray<U> {
    const modifiedFixedArray = new fixedArray<U>(this.size);

    for (let x = 0; x < this.getStoreLength(); x++) {
      const modifiedElement = iterableFunction(this.store[x]);
      modifiedFixedArray.add(modifiedElement);
    }

    return modifiedFixedArray;
  }

  // Info Features
  isFull(): boolean {
    return this.getStoreLength() === this.size;
  }

  isEmpty(): boolean {
    return this.getStoreLength() === 0;
  }
}

const newFixedArray = new fixedArray<number>(5);

newFixedArray.add(1);
newFixedArray.add(2);
newFixedArray.add(3);
newFixedArray.add(4);
newFixedArray.add(5);

newFixedArray.printItems();

newFixedArray.forEvery((element) => {
  return element * 2;
});

newFixedArray.printItems();
