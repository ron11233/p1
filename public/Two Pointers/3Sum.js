<LeetCode link>

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  nums length nums[i] size
   -  nums.length < 3 return []
   - no valid answer return []? 
     

   GIVEN:
    3 <= nums.length <= 3000
    -105 <= nums[i] <= 105


3. EXAMPLES
   normal:  -3 5 0 3 -2 -3 
   tricky:
   edge:


4. APPROACHES
   1. Naive:  for each num, run through all combinations - num[0] add num[1] and try get 0 then num[0] num[2] try..   Time O(n^3)  Space O(n^2 - if all triplets match 0 - we can get n^2)

problem: we iterate through same nums and calculate many times. we want to save calculations. 

   2. Better:  save all nums at dictionary. key - number value is array of indexes. we iterate n^2. we start num[0] num[1] - if matching num exists matchimg is -sum btw. we go to map and iterate and count all indexes to ensure we dont repeat same index as 0 , 1.  Time O(n^3)  Space O(n) - still if all chars same we can iterate all. 
  
   3. Optimal: im thinking about sorting. sorting and then run each num - make 2Sum logic. 2 pointers right left. if too big go right -- if too small left++. also take care of duplicates. if already found success skip next values which are duplicates. problem still feels inefficient since i still calculate many times each combination  Time O(nlogn + n^2 - so is it just n^2? )  Space O(n^2 - results)
  
   → implementing #3 because most time efficient


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const triplets = new Array();
    const sortedNums = nums.sort((a,b) => a-b)

    for (let numIndex = 0; numIndex < sortedNums.length; numIndex++){
        if (numIndex > 0 && sortedNums[numIndex] === sortedNums[numIndex - 1]) continue;
      const twoSum = (num) => {
          const matched = [];
          let left = numIndex + 1;
          let right = sortedNums.length - 1 

          while(left<right){
              const leftNum = sortedNums[left]
              const rightNum = sortedNums[right]
              const tripletSum = leftNum + rightNum + num
              if(tripletSum === 0){
                  matched.push([leftNum,rightNum,num])
                
                  while(leftNum === sortedNums[left]) left++
                  while(rightNum === sortedNums[right]) right--
              }else{
                  if(tripletSum > 0){
                    right--;
                  }else{
                    left++;
                  }
              }
          }
        return matched;
      }
        
      triplets.push(...twoSum(sortedNums[numIndex]))
    }
      return triplets;
};


7. VERIFICATION
