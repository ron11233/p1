<LeetCode link>

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.


1. PROBLEM
   Input: root and subroot
   Output: true if some part of root is subroot
   Rule:check if any node of root is identical to subroot both val and structure 


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - node length? both root and subroot. can subroot be bigger than root? (moreNodes)
   -  

   GIVEN:
   The number of nodes in the root tree is in the range [1, 2000].
    The number of nodes in the subRoot tree is in the range [1, 1000].
    -104 <= root.val <= 104
    -104 <= subRoot.val <= 104


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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */

const isSameTree = (node, secondNode) => {
        if(!node && !secondNode) return true;
        if(!node || !secondNode || node.val !== secondNode.val) return false
          
        return isSameTree(node.left,secondNode.left) && isSameTree(node.right, secondNode.right)
}


var isSubtree = function(root, subRoot) {
    if(!root && !subRoot) return true
    if(!root || !subRoot) return false

      const isCurrentTree =  isSameTree(root, subRoot);
      if(isCurrentTree) return true
      return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};


var isSubtree = function(root, subRoot) {
  const treeList = []
  const subTreeList = []
  
  const treeToList = (node,list) => {
      if(!node)list.push('#');
    
      list.push(`^${node.val}`)
      treeToList(node.left,list)
      treeToList(node.right,list);
    }
    treeToList(root,treeList);
    treeToList(subRoot,subTreeList);

    const listString = treeList.join(",");
    const subListString = subTreeList.join("");
      
    return listString.includes(subListString);
}



7. VERIFICATION
