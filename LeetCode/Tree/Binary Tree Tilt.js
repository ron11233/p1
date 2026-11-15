Given the root of a binary tree, return the sum of every tree node's tilt.

The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as 0. The rule is similar if the node does not have a right child.


input - root of binary tree
output - return the sum of tree node tilt :  abs(sum of leftside - sum of  rightside)

rule: calculate all left node subtree sum and all rightside and abs the - of them 

max value? can have minues values? 
  node max? 

  given: 
  

The number of nodes in the tree is in the range [0, 104].
-1000 <= Node.val <= 1000

if 0 return 0
if 1 return root 

example 
in notebook




approaches: 





  


  /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

const sum = (node) => {
    if(!node) return 0;
    return node.val + sum(node.left) + sum(node.right) 
}

var findTilt = function(root) {
    if(!root)return 0; 
    const currentTilt = Math.abs(sum(root.left) - sum(root.right));

    return currentTilt + findTilt(root.left) + findTilt(root.right)
    
    
};


var findTilt = function(root) {
    let sumTilt = 0

        const sum = (root) => {
        if(!root)return 0;

            const leftSum = sum(root.left);
            const rightSum = sum(root.right);
            sumTilt += Math.abs(leftSum-rightSum)

            return leftSum + rightSum + root.val    
        }
    sum(root)
    return sumTilt
};
