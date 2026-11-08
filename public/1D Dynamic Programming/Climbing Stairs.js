You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?


input - n steps staircase. 
output-in how many ways i can get there
rule: i can take at each time 1 or 2 steps.


constraints
n min max 

1 <= n <= 45

example 4 -
  1,1,1,1
  2,2
  2,1,1
  1,1,2
  1,2,1


approaches:
brute force: go with recursion. start call it at n. 
call dfs with n-1, n-2 and connect them
base case reached 0 return 1 if reached negetive return 0 

time: 2^n
space o(n)
problem - we recalculate many steps over and over.

better: same with memo. remember what we solved

promise - waysToN will return possible ways to reach n 
basecase - n=0 return 1 n<0 return 0
combine - can reach n from ways to n-1  +ways to n-2
time: idk
space: n depth max + memo which is o(n) max










  






  /**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const memo = new Map();
  const totalWays = waysToReach(n,memo)
  return totalWays
};

const waysToReach = (n,memo) => {
    if(memo.has(n))return memo.get(n)
    if(n === 0){
        memo.set(n,1)
       return 1;
    }
    if(n<0)return 0;
    
    const totalWays = waysToReach(n-1,memo) + waysToReach(n-2,memo);
    memo.set(n,totalWays);
    return totalWays;
}




waysToN - total numbers i can reach n 
what could have happened before last - come from n-1 or n-2 
combine - i need to add both
basecase - start at 0 - 1 way to get there


/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const waysToStep = new Array(2).fill(0);
    waysToStep[0] = 0;
    waysToStep[1] = 1;
    

    for(let currentStep = 2; currentStep <= n; currentStep++){
      
          let waysForCurrentStep = waysToStep[1] + waysToStep[0]
          waysToStep[0] =  waysForCurrentStep;
        
    }
  
  return waysToStep[n];
};





/**
 * @param {number} n
 * @return {number}
 */
var climbStairsFollowupSpaceOptimization = function(n) {
    const waysToStep = new Array(2).fill(0);
    
    waysToStep[1] = 1; // step 1
    waysToStep[2] = 2; // step 2
    

    for(let currentStep = 3; currentStep <= n; currentStep++){
      
          let waysForCurrentStep = waysToStep[1] + waysToStep[2]
          waysToStep[1] = waysToStep[2]
          waysToStep[2] =  waysForCurrentStep;
        
    }
  
  if(n < 3)return waysToStep[n]
  return waysToStep[2];
};






  

