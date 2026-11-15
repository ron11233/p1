<LeetCode link>

You are given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -   nums length? only 0 1 2 in nums? 
   -   what if only 1 or only 0 or only 2? no 0? just 1 then -2 i guess.


   GIVEN:
      n == nums.length
      1 <= n <= 300
      nums[i] is either 0, 1, or 2.


3. EXAMPLES
   normal: 2 0 1 1 0 2 
   tricky: 12212  
   edge: 2 | 20


4. APPROACHES
   1. Naive: iterate the nums array 3 times. keep index for current placing one. for example first run - start 0 index. if found not 0 keep go 1 if found 1 replac with 0Index like that then same for 1 same for 2  Time O(n*colorNum)  Space O(1)

running many times each num. - replacing few times each num 

   2. Better:  2 pointers. left will tell 0 currindex and right will tell 2. each time we find 0 replace with 0 currindex same for 2.  Time O(n)  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    let leftIndex = 0;
    let rightIndex = nums.length-1; 
    let midIndex = leftIndex;

   while(midIndex <= rightIndex){
      
      if(nums[midIndex] === 2){
         [nums[midIndex], nums[rightIndex]] = [nums[rightIndex], nums[midIndex]];
         rightIndex--;
      }
      else if(nums[midIndex] === 0){
         [nums[midIndex], nums[leftIndex]] = [nums[leftIndex],nums[midIndex]];
         midIndex++;
         leftIndex++;
      }else{
         midIndex++;
      }
   }
};


7. VERIFICATION
