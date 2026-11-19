You are given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.



input int nums (0,1,2) 
output nums 
rule: sort  them by order 0,1,2.

constraints 
nums.length
can there be no 0 / 1 / 2? 

  
n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.


example 2,1,0,2 output- 0,1,2,2
tricky 2221 return 1222
edge 1 return 1  0000 return 0000



approaches: 
brute force: loop 3 times (first red, white the blue) - each iteration, have currentIndex. every time find the color we iterate(first 0), we switch it with the index. 
time: O(3*n = O(n))
space: O(1)

problem: we iterate same nums multiple times for no reason. 

better: have leftIndex and rightIndex. left represent current 0 index and right 2. 
we will iterate with a for while loop. we will have currentIndex. every time we land on 0, we swap it with leftIndex and left++. same goes for 2. if its 1 we just keep going untouched. 

time: O(n)
space: O(1) 



walkthrough: 
have red,blue, currentNum Indexes
iterate a while loop - red !== blue indexes. if they equal - array is sorted. also currentNum < nums.length. 
inside the loop - 
if currentNum - 0, swap redIndex with currentNum, if 2 - swap with blue. always currentNum++.



/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) { // returns void
  let redIndex = 0 // 0
  let blueIndex = nums.length-1 // 2
  let numIndex = 0;

  while(numIndex < nums.length && nums[numIndex] === 0){
    redIndex++;
    numIndex++;
  }

  while(blueIndex >= 0 && nums[blueIndex] === 2) {
      blueIndex--;
  }
    
  while(numIndex <= blueIndex && numIndex < nums.length){
    const num = nums[numIndex];
    if(num === 0){ // red
        [nums[redIndex], nums[numIndex]] = [nums[numIndex], nums[redIndex]];
          while(numIndex < nums.length && nums[numIndex] === 0){
            redIndex++;
            numIndex++;
          }
    }else if(num === 2){ // blue
        [nums[blueIndex], nums[numIndex]] = [nums[numIndex], nums[blueIndex]];
          while(blueIndex >= 0 && nums[blueIndex] === 2) {
            blueIndex--;
          }
    }else{ //skip 1
    numIndex++;
    }
  }
};


