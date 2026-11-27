Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.


input int array nums
output - int num

constraints: 
nums length? value? can be negetive? can length be 0 or 1? 

  1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
Each element in the array appears twice except for one element which appears only once.

example
normal 3,4,3,6,4 return 6
tricky 3,4,4 ret 3 
edge 3 return 3 

approaches:
brute force: 
for each num iterate all other nums check if it has much. if not reutnr 
time: O(n^2)
space: O(1)

problem: iterating every cell many times 

better: 
xor  all elemnts 

  /**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let totalXor = 0;
    for(const num of nums){
      totalXor = num ^ totalXor
    }
    return totalXor
};
