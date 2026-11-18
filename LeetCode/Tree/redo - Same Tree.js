Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

input 2 roots of trees p, q
output - boolean same or not
rule: must be structrly identical with same vals

constraints
p,q nodes countes and values

The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104

example
       3
      / \                      
     3   4        
    /
  3

       3
      / \
     3   4
    /
  3

return true:

tricky: 
       3
      / \
     3   4
    /
  3

       3
      / \
     3   4
        /
       3

return false

edge: null, null
return true


approaches: 
brute force: 
promise isSameTree - returns boolean if all the 2 trees are same
me: if my right subtree, leftsubtree and me are equal we are true
basecase: nodeval is null just return

p/q nodes count is just p ,q 
time: O(Math.min(p,q))
space: O(Math.min(max depth of tree))



  /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(!p && !q) return true;
    if(!p || !q) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right) && p.val === q.val
};

var isSameTreeIterative = function(p, q) {
    const nodesToExplore = [[p,q]];

    while(nodesToExplore.length !== 0){
        const [firstNode, secondNode] = nodesToExplore.pop();

        if(!firstNode && !secondNode) continue;
        if(!firstNode || !secondNode) return false;
        if(firstNode.val !== secondNode.val) return false;
        
        nodesToExplore.push([firstNode.left, secondNode.left]);
        nodesToExplore.push([firstNode.right, secondNode.right]) 
    }
    return true;
}

