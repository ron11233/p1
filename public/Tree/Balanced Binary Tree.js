<LeetCode link>

Given a binary tree, determine if it is height-balanced.




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
 * @return {boolean}
 */
var isBalanced = function(root) {
    if(!root)return true;

    const height=(node) => {
        if(!node)return 0;
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        if(leftHeight === -1 || rightHeight === -1) return -1
        if(Math.abs(leftHeight - rightHeight) > 1) return -1 
        return Math.max(leftHeight, rightHeight) + 1;
    }

    return  height(root) !== -1
    
};



7. VERIFICATION
