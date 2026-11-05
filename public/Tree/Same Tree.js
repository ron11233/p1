<LeetCode link>

Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.


1. PROBLEM
   Input: 2 tree roots
   Output:  return true if identical false if not
   Rule:  if two binary trees have same structure and values - return true else false


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  node range?
   - if both empty return true? 
   - value limit? 

  GIVEN:
     
  The number of nodes in both trees is in the range [0, 100].
  -104 <= Node.val <= 104



3. EXAMPLES
   normal:      1            
          -5         -3
        -4

                1            
          -5         -3
        -4
          
        
   tricky:      1            
          -5         -3
        -4

               1            
          -5         -3
              -4

   edge:
   both empty 


4. APPROACHES
   1. Naive:    Time O(...)  Space O(...)
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if(!q && !p) return true;
    if(!q || !p) return false
    if(p.val !== q.val) return false
  
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
   
  
};


7. VERIFICATION
