<LeetCode link>

Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is represented by the number of edges between them.


1. PROBLEM
   Input:   root of BT
   Output:  num of longest edges between 2 nodes
   Rule:  check which 2 nodes have the most amount of edges between them and return the num


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  node length
   -  if 1 return 0 if 0 return 0? 

   GIVEN:
   The number of nodes in the tree is in the range [1, 104].
  -100 <= Node.val <= 100


3. EXAMPLES
   normal:      
   tricky:      
   edge:       1 return 0? 


4. APPROACHES
   1. Naive:  recursion over tree check distance between right left and combine  Time O(n)  Space O(h)
   2. Better:   Time O(...)  Space O(...)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result

maxDepth

  check sum leftDepth , rightDepth
  check if bigger then current max
  reutrn max between left and right


6. CODE below

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
var diameterOfBinaryTree = function(root) {
  let max = 0;

  const traverseLongestDiameter = (node) => {
    if(!node)return 0;
    const leftDiameter = traverseLongestDiameter(node.left)
    const rightDiameter =traverseLongestDiameter(node.right) 
    
    const currentSumDiameter = leftDiameter + rightDiameter;
    max = Math.max(currentSumDiameter, max)
    return Math.max(leftDiameter,rightDiameter) + 1 
  }

  traverseLongestDiameter(root)
  return max;
};

7. VERIFICATION
