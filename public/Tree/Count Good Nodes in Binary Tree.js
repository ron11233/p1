<LeetCode link>

Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.


1. PROBLEM
   Input:  root of binary tree
   Output:  number of nodes X in the tree
   Rule:  check if each node is X and count does X. check if all vals on path between him and root are lower.


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  node values range
   -  node range

  - is root X? 

   GIVEN:
    The number of nodes in the binary tree is in the range [1, 10^5].
    Each node's value is between [-10^4, 10^4].


3. EXAMPLES
   normal:
   tricky:
   edge:


4. APPROACHES
   1. Naive: iterate left with array of seen values. each time go through all array check if im greater than all. if yes add to outer var ++.anyways continue   Time O(n nodes -> each up to h times. n*h)  Space O(h)

we check all values every time

   2. Better: always keep highest value already seen only. thats a  Time O(n)  Space O(h)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


add root

Rec func addX max
check my val higher max
update max 
send to left and right



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
var goodNodes = function(root) {
    let goodNodesCount = 0;

    const lookForGoodNodes = (node, max) => {  
          if(!node) return; 
          const currMax = Math.max(node.val,max);
          if(node.val >= max) goodNodesCount++
          
          lookForGoodNodes(node.left,  currMax)
          lookForGoodNodes(node.right, currMax)
    }

  lookForGoodNodes(root, root.val);
  return goodNodesCount
};


7. VERIFICATION
