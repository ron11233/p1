There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.





left - 0
right length-1
mid is mid

check mid = target
check if left side sorted - if does check if target in range - if does go left mid+1 if not in range go right
check if right side sorted - if does check in range. if doesnt go left mid-1
else left = mid + 1




  







  /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

    let left = 0;
    let right = nums.length-1

  while(left<=right){
      const mid = Math.floor((left + right) / 2);
    
      if(target === nums[mid]) return mid;

      if(nums[mid] < nums[right]){
          if(nums[mid] < target && target <= nums[right]){
            left = mid+1
          }else{
            right = mid - 1
          }
      }else if(nums[left] < nums[mid]){
          if(nums[left] <= target && target < nums[mid]){
              right = mid-1
          }else{
            left = mid + 1
          }
      }else{
          left = mid + 1
      }
  }
  
  return -1; 
  
};
