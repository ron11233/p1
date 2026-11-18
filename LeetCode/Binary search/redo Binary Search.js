Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.




  1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.


  /**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let leftIndex = 0
    let rightIndex = nums.length-1

    while(leftIndex <= rightIndex){
        const mid = Math.floor((leftIndex + rightIndex) / 2);
        if(target === nums[mid]) return mid;
        if(target > nums[mid]) leftIndex = mid + 1
        else {rightIndex = mid - 1};
    }
  return -1
};
