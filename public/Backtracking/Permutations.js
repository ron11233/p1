Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.


input - distinct ints array - nums
output - all possible premutations.
rule: return all premutations of the nums array in any order. 

constraints
nums length? 
can be 0? if 0 return [] ? 
  if 1 return [], [nums[0]]

nums[i] range? can be negetive values? 

  given
  1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.

example 1,2,3 [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


approach :
backtracking. 

  when answer complete - used 3 nums

  num of decisions- nums.length(decisions)^nums.length(steps) but its going down. first is 3 options then 2 then 1. 
idk time and space then lol. 
  3*2*1 i guess - idk my instinct 

  

  /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const allPremutations = [];
  currentPremute([],nums,allPremutations);
  return allPremutations;  
};

const currentPremute = (path,nums, allPremutations) => {
    if(nums.length === 0) {
      allPremutations.push([...path])
      return;
    }

    for(let numIndex= 0; numIndex < nums.length; numIndex++){
        const unusedNums = [...nums]
        unusedNums.splice(numIndex,1);
        
        path.push(nums[numIndex])
        currentPremute(path,unusedNums,allPremutations);
        path.pop();
    }
}




