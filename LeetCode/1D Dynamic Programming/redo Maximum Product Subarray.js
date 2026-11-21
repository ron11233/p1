Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

Note that the product of an array with a single element is the value of that element.



input int array nums
output max product of subarray 


constraints
nums.length
nums range? can be negetive? 

1 <= nums.length <= 2 * 10^4
-10 <= nums[i] <= 10
The product of any subarray of nums is guaranteed to fit in a 32-bit integer.


example
3,-2,1,3,-3,-8 answer 54

tricky: -4,-3,-4,3 res 36
edge: -4 res - -4 

approaches:
brute force - iterate every n - foreach n - build all subarrays and keep max. do that for every n 
time: O(n^2)
space: O(1)

problem: calculating every subarray from the beginning

better: DP 
minMaxTillIndex[i] - returns min and max values till i 
me: have max min vals - max will be max between only current value, prev max * current value / prev min * current value. 
                        min will be same with math min
base case: i is n





  /**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let totalMax = -Infinity; 
    const minMaxTillIndex = [];
    minMaxTillIndex[0] = [1,1]; // min, max
    
    for(let numIndex = 1; numIndex <= nums.length; numIndex++){
        const num = nums[numIndex-1]
        const min = Math.min(num, num*minMaxTillIndex[numIndex-1][0],num*minMaxTillIndex[numIndex-1][1])
        const max = Math.max(num, num*minMaxTillIndex[numIndex-1][0],num*minMaxTillIndex[numIndex-1][1]) 
        totalMax = Math.max(totalMax, max);
        minMaxTillIndex[numIndex] = [min,max]
    }
  return totalMax;
};
