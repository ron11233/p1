Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


input nums int array
output all possible subsets

constraints 
nums length 
nums[i] range

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
  
examples
normal - 1,2,3 res- [[], [1], [1,2],[1,3],[2],[2,3],[3][1,2,3]]

tricky-
edge: 1 res- [[],[1]]

approaches: 
brute force 
skip or keep - use num in numIndex - skip num in numIndex. 
time: 2^nums.length
space: nums.length - recursion depth













  /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const subsets = [];

    fillSubsets(0, [], nums, subsets)
    return subsets;
};

const fillSubsets = (numIndex,path, nums, subsets) => {
    if(numIndex === nums.length){
        subsets.push([...path]);
        return;
    }

    fillSubsets(numIndex+1,path,nums,subsets) // skip

    path.push(nums[numIndex])
    fillSubsets(numIndex+1,path,nums,subsets) // keep
    path.pop();
}



