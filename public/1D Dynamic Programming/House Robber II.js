You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.


input - nums int array - represents the money each house has
output- max amount of money can be robbed
rule: cant steal from neighbor houses. so if i still n-1 house cant still from n and n-2. Also they mention last and first house are neighbors. so if i still n.length-1 i cant still 0 and the other way around. 


constraints 
nums.length
nums[i] values. 

  1 <= nums.length <= 100
0 <= nums[i] <= 1000

example: 1 , 3 , 5 , 7 : 10 


edge: 2,1 | 1 

approaches: brute force. 

promise: maxRob will return maxRob amount
baseCase if arrived 0 return 0 arrived 1 return max 0,1 
me: max n-1, n-2 + me. if used num[0] -substract it when calc n-2 +me - num[0]
need to add - did use 0 value or not and bubble up to first maxRob. in last one need to check. if used - cant use that val only second one.

time: 2- each call creates 2 newchoice ^n- n times
space: o(n) recursive depth

better: use memo - o(n)time o(n) space

Optimized: bottom up















  /**
 * @param {number[]} nums
 * @return {number}
 */
var robTopBottom = function(nums) {
    
    if(nums.length === 1) return nums[0]
    const numsWithoutFirst = nums.slice(1); // check if it changes inplace or not 
    const numsWithoutLast = nums.slice(0, nums.length-1)
    const totalMaxRob = Math.max(maxRob(numsWithoutFirst.length-1, numsWithoutFirst),maxRob(numsWithoutLast.length-1, numsWithoutLast))
    return totalMaxRob
};

const maxRob = (maxIndex, nums, currentMaxRobsCache = new Map())=> {
    if(currentMaxRobsCache.has(maxIndex)) return currentMaxRobsCache.get(maxIndex);
    if(maxIndex === 0)return nums[0];
    if(maxIndex === 1)return Math.max(nums[0], nums[1])

    const currentMaxRob = Math.max(maxRob(maxIndex-1,nums,currentMaxRobsCache), maxRob(maxIndex-2,nums,currentMaxRobsCache) + nums[maxIndex])
    currentMaxRobsCache.set(maxIndex, currentMaxRob);
    return currentMaxRob;
}








  /**
 * @param {number[]} nums
 * @return {number}
 */
var robDP = function(nums) {
    if(nums.length === 1) return nums[0]
    if(nums.length === 2) return Math.max(nums[0], nums[1])
    const numsNoFirstHouse = nums.slice(1);
    const numsNoLastHouse = nums.slice(0, nums.length-1);

    return Math.max(getMaxRob(numsNoFirstHouse), getMaxRob(numsNoLastHouse));
};

const getMaxRob = (nums, maxRob = new Array(nums.length).fill(0)) => {
    maxRob[0] = nums[0];
    maxRob[1] = Math.max(nums[0], nums[1])

    for(let currHouseIndex = 2; currHouseIndex< maxRob.length; currHouseIndex++){
        maxRob[currHouseIndex] = Math.max(maxRob[currHouseIndex-1], maxRob[currHouseIndex-2] + nums[currHouseIndex])
    }    
    return maxRob[maxRob.length-1]
}








