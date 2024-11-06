// stack.js
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        return this.items.pop();
    }

    getItems() {
        return this.items;
    }
}

module.exports = Stack;
