class Node {
    constructor(data = null) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array = []) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (!Array.isArray(array) || array.length === 0) return null;

        const sortedArray = Array.from(new Set(array)).sort((a,b) => a - b);
        
        const build = (arr, start, end) => {
            if (start > end) return null;
            const mid = Math.floor((start + end) / 2);
            const node = new Node(arr[mid]);
            node.left = build(arr, start, mid - 1);
            node.right = build(arr, mid + 1, end);
            return node;
        }

        return build(sortedArray, 0, sortedArray.length - 1);
    }

    insert(value) {
        if (this.root === null) {
            this.root = new Node(value);
            return this.root;
        }

        let parent = null;
        let current = this.root;
        while (current !== null) {
            parent = current;
            if (value === current.data) {
                return null;
            } else if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            }
        }

        const newNode = new Node(value);
        if (value < parent.data) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        return newNode;
    }

    delete(value) {
        const findSuccessor = (current) => {
            current = current.right;
            while (current !== null && current.left !== null) {
                current = current.left;
            }
            return current;
        }
        
        const deleteNode = (root, value) => {
            if (root === null) return root;
            
            if (root.data > value) {
                root.left = deleteNode(root.left, value);
            } else if (root.data < value) {
                root.right = deleteNode(root.right, value);
            } else {
                if (root.left === null) { 
                    return root.right;
                }
                if (root.right === null) {
                    return root.left;
                }

                const successor = findSuccessor(root);
                root.data = successor.data;
                root.right = deleteNode(root.right, successor.data);
            }
            return root;
        }
        this.root = deleteNode(this.root, value);
    }

    find(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.data) {
                return current;
            }
            current = value < current.data ? current.left : current.right;
        }
        return null;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function required')
        }
        if (!this.root) return;
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    levelOrderRecursive(callback, queue = [this.root]) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function required');
        }
        const node = queue.shift();
        if (!node) return;
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);

        this.levelOrderRecursive(callback, queue);
    }

    inOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function required');
        }
        const depthFirst = (node) => {
            if (!node) return;
            depthFirst(node.left);
            callback(node);
            depthFirst(node.right);
        }
        depthFirst(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function required');
        }
        const depthFirst = (node) => {
            if (!node) return;
            callback(node);
            depthFirst(node.left);
            depthFirst(node.right);
        }
        depthFirst(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function required');
        }
        const depthFirst = (node) => {
            if (!node) return;
            depthFirst(node.left);
            depthFirst(node.right);
            callback(node);
        }
        depthFirst(this.root);
    }

    height(value) {
        const node = this.find(value);
        if (!node) return null;
        const calcHeightofNode = (n) => {
            if (!n) return -1; // height = 0
            return 1 + Math.max(calcHeightofNode(n.left), calcHeightofNode(n.right));
        }
        return calcHeightofNode(node);
    }

    depth(value) {
        let current = this.root;
        let depth = 0;
        while (current !== null) {
            if (value === current.data) return depth;
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }
        return null;
    }

    isBalanced() {
        const check = (node) => {
            if (!node) return 0; // height = 0
            const leftHeight = check(node.left);
            if (leftHeight === -1) return -1; // left subtree is unbalanced
            const rightHeight = check(node.right);
            if (rightHeight === -1) return -1; // right subtree is unbalanced
            if (Math.abs(leftHeight - rightHeight) > 1) return -1; // tree is unbalanced
            return 1 + Math.max(leftHeight, rightHeight);
        }
        return check(this.root) !== -1;
    }

    rebalance() {
        const newArray = [];
        this.inOrderForEach(node => newArray.push(node.data));
        this.root = this.buildTree(newArray);
    }

    toArray(order = 'in') {
        const newArray = [];
        if (order === 'in') this.inOrderForEach(n => newArray.push(n.data));
        else if (order === 'pre') this.preOrderForEach(n => newArray.push(n.data));
        else if (order === 'post') this.postOrderForEach(n => newArray.push(n.data));
        else if (order === 'level') this.levelOrderForEach(n => newArray.push(n.data));
        else throw new Error('Unknown order');
        return newArray;
    }
}
