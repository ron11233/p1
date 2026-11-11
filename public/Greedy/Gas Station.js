There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.



input - 2 int arragas gas and cost from gas(i) to gas (i+1) or 0 if i = n.length-1
output return starting gas station index if can visit all gas stations from there. -1 if can't from any.
rule: start at 0 gas - need to visit all gas stations from the start

constraints

gas length = cost length? 
gas[i] range cost[i] range? 

n == gas.length == cost.length
1 <= n <= 105
0 <= gas[i], cost[i] <= 104
The input is generated such that the answer is unique.

if n=1 return 0

example

gas[1,3,1]    cost[1,2,1]  return 1

trickey gas[0,1,0] cost[1,1,1] return -1

edge [3]   const [2] return 0


approaches: 
brute force: for every n try to start - which is also takes n times max to try be first station. so n^2 time and O(1)space
problem - we recalculate many times passing through each node
better: find max subarray with diff between gas and cost

walkthrough: 

run 1 iteration both arrays at once. each iteration calc diff between gas - cost. we want to keep the index of the max consequtive diff. so every iteration we check if our max is currentSum/currentSumWithNode/onlyTheNode and keep index of that result too. if we stay with sum dont change index. we also want to treat circular sum. so i also want to know max from end and max from start, add them and see if they pass the other max. after that for - iterate the diff array we created for 0. do same sum. if reached 0 just keep the index and maxSum. maybe just keep isFirst and isLast indications in first iteration 





/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    const bestStartingStation = findBestStartingStation(gas,cost);
    const canReachAllStations = exploreCanReach(bestStartionStation,gas,cost) // -1 if can't
    return canReachAllStations
};

const findBestStartingStation = (gas,cost) => {
    let totalMaxGas = -Infinity;
    let totalMaxGasStartIndex = -1;
    let currSumGas = 0;
    let currGasStartIndex = 0;
    let isFirstMax = true;
    let isLastMax = false;
    let firstMaxGas = 0;
    let lastMaxGas = 0; 
  
  
    for(let stationIndex = 0; stationIndex < gas.length; stationIndex++){
          const currentExtraGas = gas[stationIndex] - cost[stationIndex];
          
      
          if(totalMaxGas < 0 && currentExtraGas > 0){
              currSumGas+=currentExtraGas;
          }else if(totalMaxGas < 0){
            if(isFirstMax){
              firstMaxGas = stationIndex-1
            }

              if(currSumGas > totalMaxGas){
                totalMaxGasStartIndex = currGasStartIndex;
                totalMaxGas=currSumGas;
                currSumGas = 0;
              }
              
            
          }
          
    }
}




