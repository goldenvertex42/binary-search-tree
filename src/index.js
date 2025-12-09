import "./styles.css";
import { Tree } from "./bst";

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

function randomArray(n = 15, max = 100) {
    const array = [];
    for (let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * max));
    }
    return array;
}

(function driver() {
    console.log('---- BEGIN DRIVER ----');
    const initialArray = randomArray(15, 100);
    console.log('Initial array: ', initialArray);
    const tree = new Tree(initialArray);
    console.log('Initial tree in print: ');
    prettyPrint(tree.root);

    console.log('Is Balanced? ', tree.isBalanced());
    console.log('Level Order: ', tree.toArray('level'));
    console.log('Pre Order: ', tree.toArray('pre'));
    console.log('Post Order: ', tree.toArray('post'));
    console.log('In Order: ', tree.toArray('in'));

    console.log('Insert numbers larger than 100 to unbalance: 105, 134, 324, 289, 163');
    [105, 134, 324, 289, 163].forEach(n => tree.insert(n));
    console.log('New unbalanced tree in print: ');
    prettyPrint(tree.root);
    console.log('Is tree still balanced?', tree.isBalanced());
    console.log('Rebalance the tree:');
    tree.rebalance();
    prettyPrint(tree.root);

    console.log('Did rebalance work?', tree.isBalanced());
    console.log('Level Order: ', tree.toArray('level'));
    console.log('Pre Order: ', tree.toArray('pre'));
    console.log('Post Order: ', tree.toArray('post'));
    console.log('In Order: ', tree.toArray('in'));

    console.log('---- END DRIVER ----')
})();

