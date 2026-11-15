The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.



input- binary tree's root
ouput- max sum of undirectly connected nodes
rule: max sum of nodes who arent parent / child of each other. that means calculate width of jump 2 

constraints
max nodes? 
nodes value range. can be negetive..? 


  given- 
  The number of nodes in the tree is in the range [1, 104].
0 <= Node.val <= 104

if 1 return 1
notice node.val can be 0 


examples! 
in notebook


approaches! 


Brute force: 
cal current sum
call cal ueven width 1 , 3 width level
call cal even width  0,2,4 width level
return max
time: On^2 space: o(h)

optimized - 
  every width add to either even sum or uneven sum
return max 



  

what do i need - max even and max uneven 
what my childs need for that - currentSum even currentSum uneven
return - nothing just update maxeven max ueven param 
basecase - no child return sums
time On space o(h)

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
var rob = function(root) {
    
    let sumEvenWidth = 0;
    let sumUnevenWidth = 0;
    let currentWidth = 0;
    
    const nodesToRob = new Queue(); 
    nodesToRob.enqueue(root);

    while(!nodesToRob.isEmpty()){
        const currentWidthSize = nodesToRob.size();

        for(let nodeIndex = 0; nodeIndex < currentWidthSize; nodeIndex++){
            const currentNode = nodesToRob.enqueue();
            if(currentWidth%2 === 0){
                sumEvenWidth += currentNode.val;
            }else{
                sumUnevenWidth += currentNode.val
            }
            currentNode.left && nodesToRob.enqueue(currentNode.left);
            currentNode.right && nodesToRob.enqueue(currentNode.right);
        }
      currentWidth++;
    }

  return Math.max(maxEvenWidth, maxUevenWidth);
};





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
var rob = function(root) {
    const [skip, take] = maxRob(root);
};



const maxRob = (node) => {
    if(!node) return [0,0];
  
    const [leftTake,leftKeep] = maxRob(root.left)
    const [rightTake,rightKeep] = maxRob(root.right)
  
    const take = node.val + leftSkip + rightSkip
    const skip = rightTake + leftTake
    


    return [take,skip]
}
