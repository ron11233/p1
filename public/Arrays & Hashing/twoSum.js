
https://leetcode.com/problems/two-sum/?envType=company&envId=google&favoriteSlug=google-three-months

You are given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.


1. PROBLEM
   Input: int nums , target
   Output: all 2 indexes add up to target
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - nums range
   -nums[i] range
   - if nothing empty array returned?
   - 

   GIVEN:
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

  


3. EXAMPLES
   normal:  5 4 -1 7 3 2 0 6 target - 6 
   tricky:  5 4 -1 -3 target -3
   edge: [] target -  0


4. APPROACHES
   1. Naive: iterate each num and check which num add up to target- when it does  push and continue next num    Time O(n**2)  Space O(n)
   2. Better: sort the array and then run with 2 pounters left 0 right n-1. if match both move if too small l move too big r move till r=l Time O(nlogn)  Space O(n)
   3. Optimal: go through array and save key value - num, i array (maybe many occurances)  Time O(n)  Space O(n)
   → implementing #3 because most efficient


5. WALKTHROUGH: step | state | result
  

6. CODE below

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const numToIndex = new Map();
    

    for(let numIndex = 0; numIndex < nums.length; numIndex++){
      const matchingNum = target - nums[numIndex];
      if(numToIndex.has(matchingNum)){
          return [numIndex,numToIndex.get(matchingNum)];
      }
         numToIndex.set( nums[numIndex],numIndex);
    }
};


7. VERIFICATION
