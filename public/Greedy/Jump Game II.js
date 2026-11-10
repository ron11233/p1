You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0.

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1.



input- array int nums, represents the max amount can jump from this index. 
output- min num of jumps to reach last nums index
rule: each index can jump from that index to max the val of the index (can choose any num inbetween) 

constraints
nums[i] range? can be 0? negetive? 
nums.length can be 0? 1? 

1 <= nums.length <= 104
0 <= nums[i] <= 1000
It's guaranteed that you can reach nums[n - 1].

if numslength 1 return 0 


example 3,3,1,0,1,1 return 3

tricky: 2,4,1,3,4,3 return 2
edge: 0 return 0| 3 return 0



approaches: 
brute force: from each node for loop all choices from 1 to num [i] if not 0. take max. recurse shortestPathCount. we want to count backwards like coinChange. each one will recurse +1 bubble up the answer.
  1+ max(shortestPathCount(i+1) till shortestPathCount(i+nums[i])). that way can also add cache easily. 
  
time: 1000 choices^10^4. u argued with me before its just each cell can be skip or visit once so 2^10^4. but i still didnt get it
space: dpeth max is 10^4 because num[i] = 1 till 10^4. 

better: add memo to first solution. 
time: O(n)
space O(n)


optimized: greedy technic. start from left side on a while. start left index 0. iterate till num[i] (0 for first). each time save max of(i+num[i]) at that window and his i . the next window will be from last index we iterate through (our right pointer) - till his num[i] and again. 
  time: O(n)
  space O(1)













/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
     if(nums.length === 1) return 0;
     let currentMaxIndex = 0 + nums[0]; //left
     
     let jumpsCounter = 0;

    while(lastVisitedIndex !== nums.length-1){
      let currentStepMaxIndex = -Infinity; 
      for(let currIndex = currentMaxIndex + 1; currIndex <= currentMaxIndex; currIndex++){
          currentStepMaxIndex = Math.max(nums[currIndex] + currIndex, currentStepMaxIndex)
          
      }
    }
  currentMaxIndex = currentStepMaxIndex;
  jumpsCounter++;
  
    
};





