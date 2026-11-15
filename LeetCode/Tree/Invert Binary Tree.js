<LeetCode link>

Given the root of a binary tree, invert the tree, and return its root.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -
   -

   GIVEN:
   <paste the given constraints here>


3. EXAMPLES
   normal:
   tricky:
   edge:


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
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(!root)return root;

    [root.right, root.left] = [root.left, root.right]
    invertTree(root.left)
    invertTree(root.right)
    
    return root
};


7. VERIFICATION
