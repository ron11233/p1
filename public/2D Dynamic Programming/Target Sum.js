You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.


input array of int nums, int target
output- int num of different expressions
rule: can add substract or add before each number in the expression, and use each num once. order matters.

constraints
nums length.
nums[i] range.
target range.

  1 <= nums.length <= 20
0 <= nums[i] <= 1000
0 <= sum(nums[i]) <= 1000
-1000 <= target <= 1000

example 
normal nums = [1,1,1,1,1], target = 3 output 5 


edge [3] target = 3 res 1 

approaches: 
brute force- 
promise expressionsCount: returns num of expressions from numIndex till end of nums
me: either put +1 or -1 on current num, and add both expressions in the return. 
basecase: target === 0 && nums === nums.length - return 1. if only nums ===nums.length return 0. 

time: 2^nums.length
space: nums.length

problem - calc same situition many times. add memo. 

time: O(n)
space O(n)

optimized: DP 
we have 2 changing params - target, numIndex. 

expressionCount - 







  /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
    
};



