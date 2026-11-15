<LeetCode link>

Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -nums max length nums[i] range
   -length 0 return -1 nums 1 just check if item === target 
  -repeating numbers? 

   GIVEN:
   1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.


3. EXAMPLES
   normal: 1 3 4 7 8 
   tricky: -5 0 t= 0
   edge: 4 t= 3


4. APPROACHES
   1. Naive:  check every slot  Time O(n)  Space O(1)
   2. Better: binary search   Time O(logn)  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (right>=left){
        const mid = Math.floor((right+left) / 2)

        if(nums[mid] === target)return mid;
        else if(nums[mid] < target) left = mid + 1
        else {right = mid - 1}
    }

    return -1 
};


7. VERIFICATION
