Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.



input- int array candidates, int target
output- unique combinations that sum up to target
rule: no duplications, each num can be used max 1 time


constraints 
candidates length
candidates[i] range
target range



1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30

Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

approaches:
brute force: sort candidates, then keep or skip. keep will have target - num. skip will continue with target and just index +1. have a set to store all visited paths to avoid duplicates
time: 2-decisions^nums-steps * n - spread to push combinations res array + nlogn sort= O(2^n*n) 
space: 2^n*n

problem - iterating duplications is wasteful. need to avoid it to begin with.

better: sort candidates. then do same as brute force. instead of set, when choosing skip, enforce skip for all of the num occurances (if have more than 1). this will avoid duplicate paths. 
time: nlong sort + 2^n*n 
space:2^n*n

actually time & space are just better constant time not big O haha:) 

walkthrough:
set combinationsToTarget - and return it on main func
create sortedCandidates

create fillCombinations = (candidatesIndex, combination, target,sortedCandidates,combinationsToTarget) - fill unique combinations - returns void
inside the funct we will start with keep - call same func with with index+1, target = target-candidate. 
for skip - we will create nextIndexAfterDuplications(candidateIndex,sortedCandidtaes) return int num. it will run with a while from index+1 and each time check prev num isnt equal num.
then we use that index to call our fill function again with that index and all other params remain same.
basecase: candidateIndex = sortedCandidates.length. then - if target is 0 - push, if not return;
another basecase: target = 0. push copy of the candidate and return. 

  /**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const combinationsToTarget = [];
    const sortedCandidates = [...candidates].sort((a,b) => a-b);

    fillCombinations(0, [], target,sortedCandidates,combinationsToTarget);
    return combinationsToTarget; 
};

const fillCombinations = (candidatesIndex, combination, target,sortedCandidates,combinationsToTarget) => { //returns void
      if(target === 0) {
        combinationsToTarget.push([...combination])
        return;
      }
     
      if(target < 0) return;
      if(candidatesIndex === sortedCandidates.length){
        return;
      }

  const candidate = sortedCandidates[candidatesIndex]
   combination.push(candidate);
   fillCombinations(candidatesIndex + 1, combination, target - candidate,sortedCandidates,combinationsToTarget) //keep
   combination.pop();

   const nextIndexAfterDuplications = findNextIndexAfterDuplications(candidatesIndex + 1,sortedCandidates);
   fillCombinations(nextIndexAfterDuplications, combination, target,sortedCandidates,combinationsToTarget) // skip
  
}

const findNextIndexAfterDuplications = (candidatesIndex,sortedCandidates) => {
  while(candidatesIndex < sortedCandidates.length && sortedCandidates[candidatesIndex] ===  sortedCandidates[candidatesIndex - 1]) candidatesIndex++;
  return candidatesIndex;
}
