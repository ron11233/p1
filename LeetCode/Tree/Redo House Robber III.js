The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.



input - root of a binary tree
output int max amount of money theif can rob without alerting
rule: can't steal from 2 directly linked (child and parent). 

constraints
num of nodes?can be 0/1? 
nodesval?  can be negetive? 

The number of nodes in the tree is in the range [1, 104].
0 <= Node.val <= 104


examples
            3
        /      \
       4        3
      /            \      ret - 13 
    10              3


tricky
          0
        /  \        ret - 0 
      0      0 

edge
    0       ret- 0 


approaches: 
brute force: 
getMaxAmount(didStealNeighbor): return max amount can steal 
me: math max between take current, take both childs. 
basecase- node is null

run with while loop. each loop iteration call to the getMaxAmount with currentNode. if max is current - skip to node left left left right right right right left. if not skip to childs. 
  recalc every time max for current position

time:  n - while loop * n - getMaxAmount = N^2 
space: n - depth of recursion 

problem: recalculating getMaxAmount many times for same nodes

better: 
getMaxAmount(didStealNeighbor): return max amount can steal 
me: math max between take current, take both childs. 
basecase- node is null

same as before - but do it once and return the max Amount from root. 

time: n
space: n


walkthrough 

have getMaxAmount(node, didStealNeighbor) recursion function

if(didStealNeighbor) return getMaxAmount(node.right, false) + getMaxAmount(node.left, false)
it will take Math.max between node.val + getMaxAmount(node.right,true) + getMaxAmount(node.left,true) AND didStealNeighbor(node.right, false) + didStealNeighbor(node.left, false). 
base case node is null return 0; 



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
var rob = function(root) {
    return getMaxAmount(root, false)
};

const getMaxAmount = (node, didStealNeighbor) => {
    if(!node) return 0;

    if(didStealNeighbor) return getMaxAmount(node.right, false) + getMaxAmount(node.left, false)

    return Math.max(node.val + getMaxAmount(node.right,true) + getMaxAmount(node.left,true), getMaxAmount(node.right, false) + getMaxAmount(node.left, false))
}
