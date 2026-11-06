Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.


input - root of binary tree
output - values of the nodes i can see from the right sides from top to bottom
rule: on each level - show only the most right node exists - from top to bottom


nodes length range
nodes.val range
nodes length = 0 return []? 
nodes length =1 return [root]


given - 
The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

okay so vals can be negetive and length can be 0 needto take care of 0 and 1


exmaples - in notebook

approaches: 

brute force- 

  go for each node - traverse to the level needed - and try get most right node. On^2 time and ohspace

bottleneck - everytime iterating same nodes. 

  optimized:

every time run through each level with for. enqueue always right one first. and push to results array the val of first dequeue. then add to explore all childs.

  time O(n) space: O(width of widthest part of the tree. since binary tree 2^height most. and height is logn at most so width is between 0 and 2^logn)


runthrough:

have seefromtop array
iteration queue

until empty 
take queue size (represents level)
push first one to seefromtop
enqueue right child then left.











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
 * @return {number[]}
 */
var rightSideView = function(root) {
  if(!root) return [];
  
  const rightViewNodes = [];
  const nodesToExplore = new Queue();
  nodesToExplore.enqueue(root);
  
  while(!nodesToExplore.isEmpty()){
      let currentLevelCount = nodesToExplore.size();
      
      for(let nodeIndex = 0; nodeIndex < currentLevelCount; nodeIndex++){
          const currentNode = nodesToExplore.dequeue()
           if(nodeIndex===0) rightViewNodes.push(currentNode.val)

          currentNode.right && nodesToExplore.enqueue(currentNode.right);
          currentNode.left && nodesToExplore.enqueue(currentNode.left);
          
      }
  }
    


  return rightViewNodes; 
};
