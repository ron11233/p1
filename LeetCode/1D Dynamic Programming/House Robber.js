You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

input- array nums that represents the money each house has
output- max amount of money can rob 
rule: can't rob 2 ajacent houses. 



constraints
num can be negetive? max min nums[i]
nums.length range


1 <= nums.length <= 100
0 <= nums[i] <= 400


example-
  1,4,2,0 : return 4

trickey 


edge: 0001 return 1




approaches: 
brute: 
promise: return maxtheft
me: max(n-2 + nums[n], n-1)
base: <1 = nums[n]
time n^2 
space On

use memo - time n

bottom up: 
promise - max val for n
happen right before - max (n-2, n-1)
combine - max(n-2 + me, n-1)
base 0:nums[0] 1:nums[1]


i changed my logic after start programming. 
max logic is - either n-1 without n-1 num + me or n-2 +me












  /**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {

  const maxTheft = new Array(nums.length+1);
  maxTheft[0] = nums[0]
  maxTheft[1] = Math.max(nums[1],nums[0])

  for(let currHouseIndex = 2; currHouseIndex < nums.length; currHouseIndex++){
      maxTheft[currHouseIndex] = Math.max(maxTheft[currHouseIndex-1], maxTheft[currHouseIndex-2] + nums[currHouseIndex]);
  }
  return maxTheft[nums.length-1]
  
  
};






/**
* @param {number[]} nums
* @return {number}
*/
var robO1Memory = function (nums) {
    if (nums.length === 1) return nums[0];
    let secondLastHouseMax = nums[0]
    let lastHouseMax = Math.max(nums[1], nums[0])

    for (let currHouseIndex = 2; currHouseIndex < nums.length; currHouseIndex++) {
        const lastHouseCopy = lastHouseMax

        lastHouseMax = Math.max(lastHouseMax, secondLastHouseMax + nums[currHouseIndex]);
        secondLastHouseMax = lastHouseCopy
    }

    return lastHouseMax
};









/**
* @param {number[]} nums
* @return {number}
*/
var robDownUpWithMemo = function (nums) {
    const currentMaxRob = new Map()
    const maxRob = findMaxRob(nums.length-1, nums,currentMaxRob);
    return maxRob
};


const findMaxRob = (currIndex,nums,currentMaxRob) => {
    if(currentMaxRob.has(currIndex))return currentMaxRob.get(currIndex);
    if(currIndex === 0) return nums[0]
    if(currIndex === 1){
     const currMax = Math.max(nums[0], nums[1]);
     currentMaxRob.set(1, currMax)
     return currMax;
    }
        


    const currMaxRob = Math.max(findMaxRob(currIndex -1, nums,currentMaxRob), findMaxRob(currIndex-2,nums,currentMaxRob) + nums[currIndex])
    currentMaxRob.set(currIndex, currMaxRob)
    return currMaxRob;
}





