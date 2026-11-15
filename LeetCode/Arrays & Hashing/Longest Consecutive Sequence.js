<LeetCode link>

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  nums length nums[i] range
   -   if nums.length  0 return 0?  nums.length 1 return 1? 
     -same num can repeat? 
     
     

   GIVEN:
   0 <= nums.length <= 105
   -109 <= nums[i] <= 109


3. EXAMPLES
   normal: 10 9 3 4 8 5 11 
   tricky: [1] 
   edge: []


4. APPROACHES
   1. Naive:  iterate all nums. then go in while exists next num run through new index. keep exists set if no set i guess n^3? with set n^2  Time O(n^2)  Space O(n)
   2. Better: iterate all nums. each num check if i have lower num exists in while loop until no more - then i know i have start of sequence. then another while to count sequence add to mathmax with max and tag all as visited.    Time O(n)  Space O(n)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let longestSequence = 0

    const uniqueNums = new Set(nums)

  for (const num of uniqueNums){
    if(uniqueNums.has(num-1)) continue
    let currentNum = num;

    let sequenceCounter = 1;
    
    while(uniqueNums.has(currentNum + 1)){
      currentNum++
      sequenceCounter++;
    }

    longestSequence = Math.max(sequenceCounter, longestSequence);
    
  }
  
  return longestSequence;
  
};

7. VERIFICATION
