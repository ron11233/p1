Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

nodes length
can k be bigger than nodes length
if nodes length 0 return ? 
  nodes = 1 return 1? 
does have negetive nums

  The number of nodes in the tree is n.
1 <= k <= n <= 104
0 <= Node.val <= 104

k between 1 and n okay.

Bruteforce
put all nodes in minHeap size k then take first

n (iterate nodes) * log n (push minheap)

thinking maybe i dont need to explore all nodes. since BST have some things.
most right node is heighest and most left is lowest.
i can traverse from left DFS. every time pass node +1 till it reaches k and return it. 







  node , k














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
 * @param {number} k
 * @return {number}
 */
let kthSmallestValue = -1
  
const  findIndex = (node,k,nodesBefore) => {
  if(!node)return 0;
  const leftIndex = findIndex(node.left,k,nodesBefore)
  
  if(leftIndex + nodesBefore + 1 === k){
    kthSmallestValue = node.val
    return leftIndex + nodesBefore +2
  }
  
  const rightIndex = findIndex(node.right,k,nodesBefore+leftIndex+1)
  return rightIndex + leftIndex + 1
}

var kthSmallest = function(root, k) {
    kthSmallestValue= -1;
    findIndex(root,k,0);
    return kthSmallestValue
};







