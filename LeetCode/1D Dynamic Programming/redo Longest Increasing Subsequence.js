Given an integer array nums, return the length of the longest strictly increasing subsequence.



input - int arr nums
output- int length of longest stricktly increasing subsequence 
rule: doesnt have to be consecutive

constraints 
nums.length
nums[i] range. cant be negetive? 


1 <= nums.length <= 2500
-10^4 <= nums[i] <= 10^4


examples 9,10,7,-3,8,10 res - 3 
tricky: 5,0,-1,0 ret 2 | 8 7 6 5 res- 1
edge: -4 ret 1 


approaches: 
brute force: keep or skip every item. 
countLongestSubsequence(numIndex, prevMax) - returns longest subsequence int num
me: skip/keep. 
  skip - just call countLongestSubsequence with numIndex+1
  keep - 1 + countLongestSubsequence(prevmax=num) only if num > prevMax
return max of both.
  
basecase numindex===nums.length
time: 2 (keep/skip) ^ (depth*work each step - O(n) * O(1)). total is O(2^n)
space: depth + maxStorageAtOnce - O(n) - depth + O(1) storage - O(n)


problem - many questions are answered many times 

better: add memo. 
key: numindex val: longest from numIndex till end

time: numOfState * work every state. n num of states (max of every numIndex) - work every step is 2 - either skip or keep. so 2 * n = O(n)
space: depth + maxStorageAtOnce = O(n) + O(1) = O(n) 

problem - on big n recursion can cause stack overflow

Optimized DP 
longestSubsequenceSoFar[numIndex] - longest subsequence till numIndex inclusive. 
me: iterate for 0 till numIndex. have maxTillNow var that will check each longestSubsequenceSoFar[0-numIndex] and if num > num[0-numIndex] add 1 and put in max var. keep on longestSubsequenceSoFar[numIndex] = max var. 

basecase - numIndex = nums.length. 
return longestSubsequenceSoFar[nums.length]. longestSubsequenceSoFar length is nums.length + 1 - fill 0 

time: for each n we iterate all on n its n^2 
space: O(n)



  /**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const longestSubsequenceSoFar = new Array(nums.length).fill(0);
    let longestLength = 0;

    for(let numIndex = 0; numIndex < nums.length; numIndex++){
       const num = nums[numIndex]; 
       longestSubsequenceSoFar[numIndex] = findLongestSubsequenceSoFar(numIndex,nums, longestSubsequenceSoFar);
       longestLength = Math.max(longestLength, longestSubsequenceSoFar[numIndex])
    }

  return longestLength;
};

const findLongestSubsequenceSoFar = (numIndex,nums, longestSubsequenceSoFar) => { //returns int num 
  let maxSubsequenceWithNum = 1;
  for(let prevNumIndex = 0; prevNumIndex < numIndex; prevNumIndex++){
      
      if(nums[numIndex] > nums[prevNumIndex]){
        maxSubsequenceWithNum = Math.max(maxSubsequenceWithNum, longestSubsequenceSoFar[prevNumIndex] + 1)
      }
  }
  return maxSubsequenceWithNum;
}
