<LeetCode link>

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - nums range nums[i] range 
   - numbers unique ? hes given in question
   - 

   GIVEN:
 Constraints:

      1 <= nums.length <= 5000
      -104 <= nums[i] <= 104
      All values of nums are unique.
      nums is an ascending array that is possibly rotated.
      -104 <= target <= 104


3. EXAMPLES
   normal: 5 7 8 0 1 t=0 
   tricky: 4  3 
   edge: 4  


4. APPROACHES
   1. Naive: go through all array and search Time O(n)  Space O(1)
   2. Better:  binary search Time O(log(n))  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #2 because question asked logn and more efficient 


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

      while(left <= right){
         const mid = Math.floor((left + right) / 2)
         
         if(nums[mid] === target)return mid;

         if(nums[left] <= nums[mid]){
               if(target >= nums[left] && target < nums[mid])right = mid - 1
               else{
                  left = mid + 1
               }
         }else{
            if(target >= nums[mid] && target <= nums[right]) left = mid + 1
            else {
               right = mid -1 
            }
         }
         
      }
      return -1
};

7. VERIFICATION
