Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.



  input - array of nums 
  output + rule- array of triplets - where their sum is equal 0, their index is different, and there are no duplicate values triplets.


    constraints - 
    array size >= 2?
    if no triplets exists = 0? return empty
    nums[i] size
can be minus? 

  given - 
  3 <= nums.length <= 3000
-105 <= nums[i] <= 105



  example 

2,5,-7,3,-2,0,2,-2

trickey: 0,2,1,-2

edge:  -2,-3,-4

approaches

brute force: 

for each n - go n+1 and run all of it - and run n+2 and run all combinations exists. time - n^3 space O(1)

problem - calculating all of the possible triplets in array - not removing uncessary calculations. - and seeing each cell many time 

better: each time run on 1 n - for each n - keep dictionary of seen values in dict. every time go through element check if first n + new value + x = 0 - check if x is seen. actually not dict put in Set, and remove once used. first run Set to remove duplicate values. time - O(n^2) space (O(n))

Optimal - first do sorting for the array. after that- for every n have 2 pointers left nIndex + 1 right is array.length-1. try match sum = 0. if too big go right-- if too small left ++ until reaches left===right time: set an array - iguess O(n)?  sorting is Nlog(n) - and then for each N - run all other n so n^2. overall timecomplexity N^2 space complexity: O(1)

choosing optimal because space is best with time same as better option. 


  /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
      nums.sort((a,b)=>a-b);
      const matchingTriplets = [];
      const numsLength = nums.length;
  
      for(let numIndex = 0; numIndex < numsLength; numIndex++){
         if(numIndex > 0 && nums[numIndex] === nums[numIndex-1])continue
          let left = numIndex+1
          let right = numsLength - 1;
          const currentNum = nums[numIndex];

          while(left < right){
              const currentTripletSum = nums[left] + nums[right] + currentNum
            
              if(currentTripletSum === 0) {
                  matchingTriplets.push([nums[left], nums[right], currentNum]);
                  left++;
                  right--;
                  while(left < right && nums[left] === nums[left-1]) left++;
                  while(left < right && nums[right] === nums[right+1]) right--
              }else if(currentTripletSum > 0){
                  right--;
              }else{
                left++;
              }
          }
      }
    return matchingTriplets;
};

