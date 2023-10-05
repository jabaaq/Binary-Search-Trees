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
        this.inOrderData = []
        this.preOrderData = []
        this.postOrderData = []
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

    levelOrder(root = this.root) {
        const queue = []
        const result = []

        if (root == null) return;

        queue.push(root)

        while (queue.length > 0) {
            let current = queue.shift(root)
            result.push(current.data)

            if (current.left !== null) queue.push(current.left)
            if (current.right !== null) queue.push(current.right)
        }

        console.log('Level ordered tree:', result);
        return result
    }

    inOrder(root = this.root) {
        if (root == null) return

        if (root.left !== null) {
            this.inOrder(root.left)
        }

        if (root.data !== undefined) {
            this.inOrderData.push(root.data)
        }

        if (root.data !== null) {
            this.inOrder(root.right)
        }
        console.log(`inOrdered: ${this.inOrderData}`);
    }

    preOrder(root = this.root) {
        if (root == null) return

        if (root.data !== undefined) {
            this.preOrderData.push(root.data)
        }

        if (root.data !== null) {
            this.inOrder(root.left)
        }

        if (root.right !== null) {
            this.preOrder(root.right)
        }
        console.log(`PereOrdered: ${this.preOrderData}`);
    }


    postOrder(root = this.root) {
        if (root == null) return;

        if (root.left !== null) {
            this.postOrder(root.left)
        }

        if (root.right !== null) {
            this.postOrder(root.right)
        }

        if (root.data !== undefined) {
            this.postOrderData.push(root.data)
        }
        console.log("postOrder:", `${this.postOrderData}`);
    }
}



let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const binaryTree = new Tree(testArray, 1, 9)
binaryTree.delete(3)
binaryTree.insert(11)
console.log(binaryTree.find(4));       // Node { data: 4, left: null, right: null }
console.log(binaryTree.find(10));       //false
binaryTree.levelOrder()
binaryTree.inOrder()
binaryTree.preOrder()
binaryTree.postOrder()