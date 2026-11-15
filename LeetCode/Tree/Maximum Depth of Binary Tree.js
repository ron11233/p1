
<LeetCode link>

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.




1. PROBLEM
   Input:  root of binary tree 
   Output:  max depth of the tree
   Rule:  check the depth of the most deep node and return the number


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  max nodes? range 
   -   if 0 nodes return 0? 1 node return 1? 

   GIVEN:
    The number of nodes in the tree is in the range [0, 104].
    -100 <= Node.val <= 100


3. EXAMPLES
   normal:  1
            /\
           4  3
          /
         5
   tricky:    2
              /\
             3  -2
   edge:  []


4. APPROACHES
   1. Naive: DFS and return max depth   Time O(n)  Space O(depth)
   2. Better:   Time O(...)  Space O(...)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result



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
var maxDepth = function(root) {
  const maxDepth = getDepth(root);
  return maxDepth
};

function getDepth (node)  {
  if(!node) return 0;
  return Math.max(getDepth(node.left), getDepth(node.right)) + 1
}


var maxDepth = function(root) {
  const maxDepth = getDepthGiven(root, 0);
  return maxDepth
};

function getDepthGiven(node,count){
  if(!node) return count;
  return Math.max(getDepthGiven(node.left, count+1), getDepthGiven(node.right, count+1))
}


var maxDepth = function(root) {
  let depthCount = 0;
  
  const getDepthInside = (node,count) => {
    if(!node) return 0;
    
    depthCount = Math.max(getDepthInside(node.left, count+1), getDepthInside(node.right, count+1));
    
  }
  
  const maxDepth = getDepthGiven(root, 0);
  return maxDepth
};




7. VERIFICATION
