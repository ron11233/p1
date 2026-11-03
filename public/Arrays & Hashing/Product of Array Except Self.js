<LeetCode link>

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - nums range nums[i] range
   -  if have 0 
   - no nums return [] 
  - what to return if only 1 value exists 

   GIVEN:
Constraints:

  2 <= nums.length <= 105
  -30 <= nums[i] <= 30
The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.
 


3. EXAMPLES
   normal: 5 2 3 -5 answer[-30 -75 -50 30]
   tricky:  
   edge: -5 3  answer 3 -5


4. APPROACHES
   1. Naive:  for each element run through all items but self and multiple add to answer   Time O(n^2)  Space O(n)
   2. Better:  create 2 arrays left and right - and iterate the nums. each index multiple by num and add it to right / left build it like that Time O(n)  Space O(n)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const leftProducts = new Array(nums.length).fill(1)
    const rightProducts = new Array(nums.length).fill(1)
    const answers = new Array(nums.length)

    let currentLeftProducts = 1;
    let currentRightProducts = 1;
  
    for (let leftIndex = 0; leftIndex < nums.length - 1; leftIndex++){
      const leftNum = nums[leftIndex];
      const rightIndex = nums.length-1-numIndex;
      const rightNum = nums[rightIndex];
      
      currentLeftProducts *= leftNum
      currentRightProducts *= rightNum

      leftProducts[leftIndex+1] = currentLeftProducts
      rightProducts[rightIndex-1] = currentRightProducts
      
      
    }

    for(let leftIndex = 0; leftIndex < nums.length; leftIndex++){
        answers[leftIndex] = leftProducts[leftIndex] * rightProducts[leftIndex]
    }
  return answers;
};


7. VERIFICATION
