Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.




input - int array nums, int k
output- int num 
rule: num is total subarrays whos sum equals k


constraints: 
nums[i] and k ranges - can be negetive?
nums.length range, can be 0? 





1 <= nums.length <= 2 * 10^4
-1000 <= nums[i] <= 1000
-10^7 <= k <= 10^7

exmaple -1,1,3,-2,-1 k = 0 return 2
tricky: 
edge: 3 k =0 return 0 

approaches:
brute force: 
for each num go all other nums, calculating sum and ++ on subarrayEqualSum when sum is equal. 
time: n^2 
space: O(1)

problem- recalculating same nums multiple times

better: 
create a hash map with prefixesSum and count. we iterate the nums once. every time we add totalSum upuntil now, then we check if we can cut some of the array to get to target (our subarray) if we do we count all occurances

time: O(n)
space: O(n)

walkthrough

create prefixSumCounts - key is prefixSum and value is the count it exists
create countSubarrayEqualSum(prefixSumCounts,k,nums) // returns subArrayEqualSumCount int num
return subArrayEqualSumCount
in countSubarrayEqualSum:
create sum var, subArrayEqualSumCount. 
we iterate through nums 
add num to sum. then check on prefixSumCounts if we have sum-k. if we do we add to subArrayEqualSumCount += prefixSumCounts(sum-k)count
then add the sum to prefixSumCounts.
  return subArrayEqualSumCount





/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  const prefixSumCounts = new Map();
  prefixSumCounts.set(0,1);
  return countSubarrayEqualSum(prefixSumCounts,k,nums)
};


const countSubarrayEqualSum = (prefixSumCounts,k,nums) => {
    let subArrayEqualSumCount = 0;
    let sum = 0;

    for(const num of nums){
        sum += num;
        if(prefixSumCounts.has(sum-k)) subArrayEqualSumCount +=  prefixSumCounts.get(sum-k);
        if(!prefixSumCounts.has(sum)) prefixSumCounts.set(sum, 0);
        prefixSumCounts.set(sum, prefixSumCounts.get(sum) + 1);
    }
    return subArrayEqualSumCount;
}



