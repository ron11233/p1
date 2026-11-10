Given an integer array nums, find the subarray with the largest sum, and return its sum.


input- array int nums
output-sum of the subarray with largest sum
rule: must be subarray


constraints 
nums length
nums[i] range? negetive nums? 

  1 <= nums.length <= 105
-104 <= nums[i] <= 104

  examples
3,-5,-2,5,-2,3 res - 6




edge 1 return 1

approaches
brute force
create every subarray cal it's sum and save the max of all. n^2 time o1 space

waste: calc same sum many times

better: 
on each step choose - totalmax will be between current alone, prevTotalMax, current+currSum. if current+currSum > current add, if not currSum = current. 
time O(n)
space O(1)








  


  /**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let totalMaxSum = -Infinity;
    let currentSum = 0;
  
    for(const num of nums){
           if(num + currentSum > num){
               currentSum +=num
           }else{
               currentSum = num
           }

      totalMaxSum = Math.max(totalMaxSum, currentSum, num);
    }
  
  return totalMaxSum;
};




