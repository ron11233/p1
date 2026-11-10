Given an integer array nums, return the length of the longest strictly increasing subsequence.

input array of int nums
output - longest increasing subsequence length
rule: can skip cells, cant change order. 



constraints

nums length max 
nums[i] range? can have negetive? 

  1 <= nums.length <= 2500
-104 <= nums[i] <= 104

  example 10 11 8 12 9 output 3 


approaches:

bruteforce: 
for each n run all other n and count heigher increasing nums. return max count
time- for each n run all other n is n^2
space: o(1)








  



  /**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    
};







