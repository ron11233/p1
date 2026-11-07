You are given the root of a binary tree.

A ZigZag path for a binary tree is defined as follow:

Choose any node in the binary tree and a direction (right or left).
If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
Change the direction from right to left or from left to right.
Repeat the second and third steps until you can't move in the tree.
Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

Return the longest ZigZag path contained in that tree.



input - root of a binary tree
output - count of longest zigzag path 
rule: on each node - check the longest zigzag path - return max of all nodes 


constraints 
nodes range? 
  if 0,1 return 0
if 2 return 1 

given-
The number of nodes in the tree is in the range [1, 5 * 104].
1 <= Node.val <= 100

example! 
        3
      /     \
    4        4
          /     \
          3      7  
                /
              8
                \
                 9

trickey:


edge:  
3

 3
/
4


approaches:
brute force
for each node - help func to calc right zigzag - left zigzag. then - call same function with right child and left child. then check max between me left right child. time: O(n^2) space: O(h)
problem - every time calculating zigzag from beginning - can always return max 


optimzed: 

helper maxLength(node, currPathSize, nextMove)
const rightmax = nextMove(currPath,nextMove = opposite)
const leftMax nextMove(1, nextMove)
return max(right,left)

send +1, nextMove: right

return leftmax, rightMax

count rightSideMax 


  

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

var longestZigZag = function(root) {
    const maxZigZagLength = exploreMaxZigzag(root,0);
    return maxZigZagLength;
};

const exploreMaxZigzag = (node,currentLength, nextMove) => {
    if(currentLength === 0){
        return Math.max(exploreMaxZigzag(node.left, 1, "right"), exploreMaxZigzag(node.right,1,"left"));
    }
    if(!node) return currentLength - 1;

    const leftMaxZigZag = exploreMaxZigzag(node.left, nextMove ==="left" ? currentLength + 1 : 1, "right")
    const rightMaxZigZag = exploreMaxZigzag(node.right, nextMove ==="right" ? currentLength + 1 : 1, "left")

    return Math.max(leftMaxZigZag, rightMaxZigZag); 
}




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

var longestZigZagIterative = function(root) {
    const pathsToExplore = new Queue();
    root.left && pathsToExplore.enqueue([root.left,1,"right"]);
    root.right && pathsToExplore.enqueue([root.right,1,"left"]);

    return exploreMaxZigzag(pathsToExplore);
};

const exploreMaxZigzag = (pathsToExplore) => {
    let currentMaxZigzag = 0;

    while(!pathsToExplore.isEmpty()){

    
        const [node,currentLength,nextMove] = pathsToExplore.dequeue();

        currentMaxZigzag = Math.max(currentMaxZigzag,currentLength);

        if(node.left){
            if(nextMove === "left") pathsToExplore.enqueue([node.left, currentLength + 1 , "right"])
            else{
                pathsToExplore.enqueue([node.left, 1 , "right"])
            }
        }
        if(node.right){
            if(nextMove ==="right") pathsToExplore.enqueue([node.right, currentLength + 1 , "left"])
            else{
                pathsToExplore.enqueue([node.right,1 , "left"])
            }
        }
    }

    return currentMaxZigzag;
}
