Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys strictly less than the node's key.
The right subtree of a node contains only nodes with keys strictly greater than the node's key.
Both the left and right subtrees must also be binary search trees.


input - root of tree
output - is it binary search tree
rule - check if each left side of current node is smaller then right and current node. check if for every subtree

nodes range? 

  given- 
The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1

make sure if 1 its true. 

normal                8
          7                         10     
                            9                  11


trickey
                        8
              6                  10            
                        7                11

edge
              3


pass max val 


return leftSubtree max <= currentnode.val && currentnode.val <= rightsubtree min

      





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
 * @return {boolean}
 */

const isValid = (node, low, high) => {
    if (!node) return true;

    if (node.val >= high || node.val <= low) return false

    return isValid(node.left, low, node.val) && isValid(node.right, node.val, high)
}

var isValidBST = function (root) {
    return isValid(root, -Infinity, Infinity) 

};



time: n space: h




