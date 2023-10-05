const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(inputArray) {
        this.root = this.buildTree(inputArray, 0, inputArray.length - 1)
        prettyPrint(this.root)
    }

    buildTree(inputArray, start, end) {
        if (start > end) return null

        let middle = parseInt((start + end) / 2)
        let root = new Node(inputArray[middle])

        root.left = this.buildTree(inputArray, start, middle - 1)
        root.right = this.buildTree(inputArray, middle + 1, end)

        return root
    }

    insert(value, root = this.root) {
        if (root === null) {
            return root = new Node(value)
        }

        if (root.data < value) {
            root.right = this.insert(value, root.right)   //insert to the right
        } else {
            root.left = this.root(value, root.left)         //insert to the left
        }

        prettyPrint(this.root)
        return root
    }

    delete(value, root = this.root) {
        if (root === null) {
            return root
        }

        if (root.data > value) {
            root.left = this.delete(value, root.left)
        } else if (root.data < value) {
            root.right = this.delete(value, root.right)
        } else {
            if (root.left === null) {
                return root.right
            } else if (root.right === null) {
                return root.left
            }
            root.right = this.delete(root.right, root.data)
        }
        prettyPrint(this.root)
        return root
    }

    find(value, root = this.root) {
        if (root === null) return false

        if (root.data == value) return root

        if (root.data > value) {
            return this.find(value, root.left)
        } else if (root.data < value) {
            return this.find(value, root.right)
        }
        prettyPrint(this.root)
        return root
    }
}

let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const binaryTree = new Tree(testArray, 1, 9)
binaryTree.delete(3)
binaryTree.insert(11)
console.log(binaryTree.find(4));       // Node { data: 4, left: null, right: null }
console.log(binaryTree.find(10));       //false