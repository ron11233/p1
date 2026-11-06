Given the root of a binary tree, return the maximum average value of a subtree of that tree. Answers within 10-5 of the actual answer will be accepted.

A subtree of a tree is any node of that tree plus all its descendants.

The average value of a tree is the sum of its values, divided by the number of nodes.




input- root of a binary tree
output- max average of any subtree in that tree 
rule- check every nodes average and keep the max of them 

node vals range
node length range
if 0 return 0 
if 1 return root.val

given - 
  The number of nodes in the tree is in the range [1, 104].
  0 <= Node.val <= 105

example notbook as always :) 



Approaches

BRUTE FORCE
current average - 
  leftCount = count(left)
  rightCount = count(right)
  sum(left) + sum(right) + node / (leftCount+rightCount+1)

Math.max(same for(left), sameforright, currentaverage)

time complexity - for each node - * - count is O(n) + sum O(n) - so total O(n^2) space- O(h)

problem - i iterate each node many times. 

  optimization - 
  each node gets [sum, nodesCount,maxAvg] - from both childs. he calc his own avg and return same with mathmax on avg his sum and nodescount adjusted.
  time O(N) space O(h)

i do need a helper function - because i want to return those 3 items for each child i need them - but main fuction wants to return a number. so ill use an helper function



RUNTHROUGH 

  node gets sum nodescountavg from leftchild
                              from rightchild

  calc currentsum ,avg 

returns currsum mathmax avg and nodescountTotal + me









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
const calculateAvg = (node) => {
  if(!node)return [0, -Infinity, 0]
  const [sumLeft, avgLeft, nodesCountLeft] = calculateAvg(node.left)
  const [sumRight, avgRight, nodesCountRight] = calculateAvg(node.right)

  const currentNodesCount = nodesCountLeft + nodesCountRight + 1
  const currentTotalSum = sumLeft + sumRight + node.val
  const currentAvg = currentTotalSum/currentNodesCount;

  return [currentTotalSum, Math.max(avgLeft,avgRight,currentAvg), currentNodesCount]
}
 
var maximumAverageSubtree = function(root) {
  const [sum, maxAvg, nodesCount] = calculateAvg(root);
  return maxAvg
};
