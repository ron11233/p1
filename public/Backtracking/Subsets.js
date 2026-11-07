Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


  input - array nums of unique elements
  output - all possible combinations
  rule: can't duplicate subsets. all unique. 


constraints:
nums max length min length
if length 1 just [] and [nums0]
nums[i] value range - can be negetive? 

  given - 

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

  example [1,3,2]
          [] [1][13][12][23][132][2][3]

  edge already gave [1] - [], [1]

bruteforce-  
  first for is 1 length
  second have right and left. left0 right left+1. go right til finish then go left 1 right = left+1 go right again
  3 is 1 cuz length of array
  time - O(n^?)
  space O(1)



optimized: idk












/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const allSubsets =[] 
    explore(0,[],allSubsets,nums)
    return allSubsets;
};

const explore = (i, path, allSubsets, nums) => {
    
    if(i === nums.length){
        allSubsets.push([...path]);
        return;
    }

    explore(i+1,path,allSubsets,nums)
    path.push(nums[i]);
    explore(i+1,path,allSubsets,nums)
    path.pop();
}
