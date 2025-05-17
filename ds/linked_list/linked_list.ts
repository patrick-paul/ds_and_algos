type nodeOrNull = ListNode | null;

class ListNode {
  data: number;
  next: nodeOrNull;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: nodeOrNull;
  tail: nodeOrNull;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add new element at the end
  add(data: number): void {
    const newNode = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  // Add new element at the start
  addFromStart(data: number): void {
    const newNode = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.size++;
  }

  // Delete an element
  delete(data: number): boolean {
    if (!this.head) return false;

    let currentNode: nodeOrNull = this.head;
    let prevNode: nodeOrNull = null;

    while (currentNode && currentNode.data !== data) {
      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    if (!currentNode) return false;

    if (!prevNode) {
      // Deleting head
      this.head = currentNode.next;
      if (!this.head) this.tail = null; // If list becomes empty
    } else {
      prevNode.next = currentNode.next;
      if (currentNode === this.tail) {
        this.tail = prevNode;
      }
    }

    this.size--;
    return true;
  }

  // Print list elements
  print(): void {
    let currentNode: nodeOrNull = this.head;
    const elements: number[] = [];

    while (currentNode) {
      elements.push(currentNode.data);
      currentNode = currentNode.next;
    }

    const listString = elements.join(" -> ") || "Empty";
    console.log("Elements in the list:", listString);
    console.log("Size of the list:", this.size);
  }
}

const list = new LinkedList();

console.log("🟢 Adding elements at the end:");
list.add(10);
list.add(20);
list.add(30);
list.print();

console.log("🟢 Adding element at the start:");
list.addFromStart(5);
list.print();

console.log("🟡 Deleting element 20:");
console.log(list.delete(20) ? "Deleted!" : "Not found.");
list.print();

console.log("🔴 Trying to delete non-existing element 99:");
console.log(list.delete(99) ? "Deleted!" : "Not found.");
list.print();

console.log("🟢 Deleting head (5):");
console.log(list.delete(5) ? "Deleted!" : "Not found.");
list.print();
