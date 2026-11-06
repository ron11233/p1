
Given the root of a binary tree, flatten the tree into a "linked list":

The "linked list" should use the same TreeNode class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.


input- root of binary tree
output - a linked list with preorder traversal from TreeNode object

rule: each node should point as his right child the next node on the list - pre order way (node -> left -> right)


constraints
node length and value limitations
negetive values length 0 / 1 

if length is 0 return root
if length is 1 return root

given- 
The number of nodes in the tree is in the range [0, 2000].
-100 <= Node.val <= 100

example: 
in notebook


approaches

bruteforce - 
  



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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if(!root)return;
  
    const leftTail = flatten(root.left)
    const rightTail = flatten(root.right)

    if(leftTail && !rightTail){
        const currentLeft = root.left
        root.right = currentLeft
        root.left = null
        return leftTail;
    }else if(!rightTail && !leftTail){
        return root;
    }else if(leftTail&&rightTail){
        const currentRight = root.right
        root.right = root.left;
        leftTail.right = currentRight
        root.left = null
    }

    return rightTail;
};
