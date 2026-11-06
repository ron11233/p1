Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”










/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */



  
var lowestCommonAncestor = function(root, p, q) {
  
   if(!root || p === root || q === root) return root;
  
    const left= lowestCommonAncestor(root.left,p,q);
    const right = lowestCommonAncestor(root.right,p,q);
  
    if(left && right) return root;
    return left || right
    
};


var lowestCommonAncestorBST = function(root, p, q) {
    
    if(p.val < root.val &&  root.val < q.val || q.val < root.val && root.val < p.val ) return root;
    if(root === p || root === q) return root
    if(root.val < p.val) {
        return lowestCommonAncestor(root.right,p,q);
    }
    return lowestCommonAncestor(root.left,p,q);

    
};
