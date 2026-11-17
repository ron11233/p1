You are given an integer array cost where cost[i] is the cost of ith step on a staircase.

Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the staircase, which is the position just past the last step (index cost.length).


input cost int array 
output - int number min cost to reach past all steps.
rule: each step has cost, can start either from step 0 or 1, after paying the cost at the stair can jump either 1 or 2 stairs. 

constraints
cost length
cost[i] range. can be negetive? 

  2 <= cost.length <= 1000
0 <= cost[i] <= 999

examples
normal   1,1,2,1,3 res - 2

tricky 0 0 0 1 - res 0 

edge 1 2 res - 1

approaches:

brute force: try every possible combinations. at every step - try both jump 1 or jump 2 stairs. on the start try both start at step 1 or 2. 
promise: minCost(stairIndex, cost) - returns the minCost to the top.
me: return cost[stairIndex] + Math.min(minCost(stairIndex + 1,cost) AND minCost(stairIndex+2,cost)). for for index just take the lowest one.
base case stairindex is cost.length return 0;

time: O(2^n)
space: O(n)

problem: recalculating same problem many times. like min cost reach from stair 7 to end. 

better: add memo
we will save on memo before returning. key-stairIndex value - minCost to reach top

time: O(n-n states: each stair has 1 state)
space: O(n-same as time n state each state 1 value int)

problem: recursion can go OOM. 

optimized: 1D DP 
promise: minCost[i] - minCost from i to end. 
me: iterate from cost.length to 0. each iteration take min between cost[i+1], cost[i+2], and add cost[i]. 
basecase- reach i is 0.
return minCost[0]

time space same as better solution

super optimized:
we see that we are using only 2 prev values in the DP- so we can only keep 2 variables instead O(n) array

time same as better
space O(1)





  /**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    let nextStepMinCost = cost[cost.length-2]
    let twoStepsMinCost = cost[cost.length-1]
    let currentMinCost;
  
    for(let stairIndex = cost.length-3; stairIndex >= 0; stairIndex--){
        currentMinCost = cost[stairIndex] + Math.min(nextStepMinCost,twoStepsMinCost);
      
        twoStepsMinCost = nextStepMinCost;
        nextStepMinCost = currentMinCost;
    }
  
    return Math.min(nextStepMinCost,twoStepsMinCost) ;
};

