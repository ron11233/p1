You are given an integer array cost where cost[i] is the cost of ith step on a staircase.

Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the staircase, which is the position just past the last step (index cost.length).


input - cost array each cell is the cost to climb that step. 
output - minimum cost to reach the top (n+1)
rule: each time u pay u can climb 1 or 2 steps. u can start at step 0 or 1. 

constraints
n length?
cost range?

2 <= cost.length <= 1000
0 <= cost[i] <= 999


example 10 20 11 3  - 21

approaches: 
brute force: 
calc minimum 1 step back minimum 2 step back recursively.
  promise - minimum n-1 min n-2
  me: check which one is better - n-1 or n-2 + me - take minimum of them
  return minimum of them
base case- n=1 return costs 1 n=0 return costs 0

time:  2 - choices each time^n - steps. 
space: o(n) recursion can go n deep

problem: calculating many times same calculations. 

better approach-  dynamic programming

promise: returns minimum cost 
me: get both n-1, n-2 - save myself on memo, and return minimum between n-2+me or n-1
base case- n=1 return costs 1 n=0 return costs 0

time: o(n)
space: o(n)






  

  /**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
      const minCostForAllStairs = minCostForStair(cost.length, cost);
      return minCostForAllStairs;
};


const minCostForStair = (currIndex, cost,memo = new Map()) => {
    if(memo.has(currIndex))return memo.get(currIndex);

    if(currIndex < 2 ){
        memo.set(currIndex, 0);
        return 0
    }
    const prevStepMinCost = minCostForStair(currIndex-1, cost,memo) + cost[currIndex-1];
    const secondPrevStepMinCost = minCostForStair(currIndex-2, cost,memo) + cost[currIndex-2];

    const currMinimumCost = Math.min(prevStepMinCost,secondPrevStepMinCost);
    memo.set(currIndex, currMinimumCost);
    return currMinimumCost;
}





  /**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairsBottomUp = function(cost) {
      const minCostToCurrentStep = new Array(cost.length).fill(0);
      minCostForStair(minCostToCurrentStep, cost);
      return minCostToCurrentStep[cost.length];
};


const minCostForStair = (minCostToCurrentStep, cost) => {
    
    for(let currStep = 2; currStep <= cost.length; currStep++){
        const prevStepCost = minCostToCurrentStep[currStep - 1] + cost[currStep-1];
        const secondPrevStepCost = minCostToCurrentStep[currStep - 2] + cost[currStep-2];
        minCostToCurrentStep[currStep] = Math.min(prevStepCost,secondPrevStepCost)
    }
}



  /**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairsO1Space = function(cost) {
      
      minCostForStair( cost);
      return minCostToCurrentStep[1];
};


const minCostForStair = (cost) => {
    let stepBackMinCost = cost[1];
    let twoStepsBackMinCost = cost[0]; 

    for(let currStep = 2; currStep <= cost.length; currStep++){
        const prevStepCost = minCostToCurrentStep[1] + cost[currStep-1];
        const secondPrevStepCost = minCostToCurrentStep[0] + cost[currStep-2];
        minCostToCurrentStep[0] = minCostToCurrentStep[1];
        minCostToCurrentStep[1] = Math.min(prevStepCost,secondPrevStepCost)
    }
}


