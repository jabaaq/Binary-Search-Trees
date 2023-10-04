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
}

let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const binaryTree = new Tree(testArray, 1, 9)
