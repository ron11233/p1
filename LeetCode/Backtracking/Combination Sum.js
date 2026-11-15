Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.




input- candidates int array of distinct integers, and a target k.
output- all unique combinations that lead to that sum. can use same number many times. must be unique combination - cant repeat same amount of nums exacly twice.





constraints 
can have negetive num? whats candidates[i] range
  wahts target range
what if no answer? cant reach this sum
candidates length limits


1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40



example:  1,2,3           target=6 [[111111]. [33], [22][123][1221][3111]

approaches: 
so for each time we have to choose between all of the number of candidates.
stop when we reached number of 6 / above.
if reached 6 should have seen also and take it out 
time: n (approacheslength) ^ candidates i start with 2 and target can be 40- so we can have 20 levels. so n^20
space: n^20*n (...results);

extra space: i have the seen object - its up to max combinations * candidatesCount. maxCombinations is n^20 * 40 (candidatesCount).also we have the dfs which can reach n^20. so (n^20)^2*40

runthrough: 

call helper function
helper function needs - path, approaches, target,seen,results

if target is 0 and not seen, add path to results and seen. if target < 0, return.

iterate through all approaches each time push to stack explore and pop.
  














  /**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
      const allCombinationsSum = []
      const seenCombinations = new Set();
      exploreCombinationsToSum([],candidates,target,seenCombinations,allCombinationsSum);

    return allCombinationsSum
      
};


const exploreCombinationsToSum = (path,candidates,target,seenCombinations,allCombinationsSum) => {
    if(target === 0){
        const sortedPath = [...path].sort((a,b) => a-b).join('#')
        if(!seenCombinations.has(sortedPath)) {
          allCombinationsSum.push([...path])
          seenCombinations.add(sortedPath)
        }
        return;
    }
   if(target < 0) return;

   for(let candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++){
       const candidate = candidates[candidateIndex]
       path.push(candidate)
       exploreCombinationsToSum(path,candidates,target-candidate, seenCombinations,allCombinationsSum);
       path.pop()
   }
}




  /**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
      const allCombinationSum = []
      exploreCombinationsToSum(0,[],candidates,target, allCombinationSum);

    return allCombinationSum
      
};


const exploreCombinationsToSumEfficient = (candidatesStartIndex, path,candidates,target,allCombinationsSum) => {
    if(target === 0){
        allCombinationsSum.push([...path])
        return;
    }
   if(target < 0) return;

   for(let candidateIndex = candidatesStartIndex; candidateIndex < candidates.length; candidateIndex++){
       const candidate = candidates[candidateIndex]
       path.push(candidate)
       exploreCombinationsToSum(candidateIndex,path,candidates,target-candidate,allCombinationsSum);
       path.pop()
   }
}



