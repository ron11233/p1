Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).



input binary tree root
ouput array of level by level of the tree nodes
rule- every array cell should contain all current level nodes by left to right order.

  constraints: 
how many nodes ?
  nodes[i] range? can have -? 

  if 0 return empty? if 1 return root in array?

  The number of nodes in the tree is in the range [0, 2000].
  -1000 <= Node.val <= 1000


examples





solutions: 

BruteForce- 
  get height of all tree
  then for each level - go from root to that level and add to array by left to right

time- first height o(n), then for every time to other level - is h * width     space first height o(h), h*w
we go through each node many times


optimized: 
iterate with BFS left to right for for every level. 

  time: o(n) space o(n)

runthrough

push first node to queue

until queue empty

run for current queue size - level
array for current level
enqueue all childrens
push current level array to big array




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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];
  
    const nodesByLevel = [];
    const nodesToExplore = new Queue([]);
    nodesToExplore.enqueue(root);

    while(!nodesToExplore.isEmpty()){
        let currentLevelCount = nodesToExplore.size();
        const currentLevelNodes = [];

        for(let nodeIndex = 0; nodeIndex < currentLevelCount; nodeIndex++){
            const currentNode = nodesToExplore.dequeue();
            currentLevelNodes.push(currentNode.val);
            currentNode.left && nodesToExplore.enqueue(currentNode.left)
            currentNode.right && nodesToExplore.enqueue(currentNode.right)
        }
        nodesByLevel.push(currentLevelNodes);
    }
    return nodesByLevel;
};


