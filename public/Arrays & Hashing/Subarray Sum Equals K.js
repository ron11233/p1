<LeetCode link>

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

   
1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -nums and nums[i],k sizes
   - 

   GIVEN:
   1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107


3. EXAMPLES
   normal: 5 -3 7 -7 9 
   tricky: -5 5  
   edge: 3


4. APPROACHES
   1. Naive:   iterate through each num, going through all nums slicing part of array and trying get the sum Time O(n^2)  Space O(n^2)
   2. Better:  iterate through each num with a map that counts the sums we have and everytime we check if we have the sum we need - if do add Time O(n)  Space O(n)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
       const sumToCount = new Map();
       let sum = 0;
       let totalSubarrays = 0;
       sumToCount.set(0,1);
   
      for(const num of nums){
         sum+=num
         const matchingNum =  sum - k 
         if(sumToCount.has(matchingNum)){
            totalSubarrays += sumToCount.get(matchingNum)
         }
         sumToCount.set(sum, (sumToCount.get(sum) || 0 ) + 1)
      }

   return totalSubarrays;
};


7. VERIFICATION
