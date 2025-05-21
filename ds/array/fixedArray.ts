type storeType<T> = Record<number, T>;
type indexAndBoolean = {
  indexObtained: number | undefined;
  isAvailable: boolean;
};

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

  set(index: number, value: T): void {
    if (index < 0 || index >= this.size)
      return console.log("Array Out of bound!");
    this.store[index] = value;
    return;
  }

  snatch(): void {
    const lastElementIndex = this.getStoreLength() - 1;
    if (lastElementIndex >= 0) {
      delete this.store[lastElementIndex];
      this.length--;
    }

    return;
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

  // Info Features
  isFull(): boolean {
    return this.getStoreLength() === this.size;
  }

  isEmpty(): boolean {
    return this.getStoreLength() === 0;
  }
}
