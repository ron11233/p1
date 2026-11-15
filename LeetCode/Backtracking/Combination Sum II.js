Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.




input - candidates array of int, target num
output- all possible combinations to reach sum with the candidates nums 
rule: each num[index] in candidates can be used only once.

  constraints: 
candidates length
candidates[i] range
target range 

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30

  
example 1,3,3,2,1 target 6 - 3,3 - 1,3,2 

[10,1,2,7,6,1,5], target = 8
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

approaches: 
brute: iterate recursivly. every call for loop through all nums. if reached target check seen. if not seen add to seen and answer. if below 0 return.. 
O(max / target - levels * decisions which is n ) so (n^m/t) - this is the amount of leaf nodes. and each will push so n*(n^m/t)
total space: i dont know how many worst case will be in my results array so how can i calculate..?  recursion will go M/T depth
extra space: O(1)

problem - we get so many leaf nodes we dont need.using same index isn't allowed so we should skip the ones who use it. 

optimized: 
iterate recursivly. every call do for loop. call each cell and use current num - and send next call i+1 so he doesnt repeat same index num. if below -1 return if 0 push. 
time: n!(decisions)^n(depth) * n(insert to results)
total space: n!^n - leafs (results) 
extra space O(1)


walkthrough
call helper function to explore all sums.
helper base case - either target smaller than 0 or target = 0. if =0 push and return if <0 return.

then we want to iterate all options from index to maxlength
in each one we want to send next iteration index + 1 so we dont repeat. ofc push and pop the current num




/**
* @param {number[]} candidates
* @param {number} target
* @return {number[][]}
*/
var combinationSum2 = function (candidates, target) {
    const allCombinationSums = [];
    const sortedCandidates = [...candidates].sort((a,b) => a-b);
    exploreCombinationsSums(0, sortedCandidates, target, [], allCombinationSums)
    return allCombinationSums;
};

const exploreCombinationsSums = (candidateIndex, candidates, target, path, allCombinationSums) => {
    
    if (target === 0) {
        allCombinationSums.push([...path])
        return;
    }
    if (target < 0 || candidateIndex === candidates.length ) return;

    let next = candidateIndex;
    while(next < candidates.length && candidates[next] === candidates[candidateIndex])next++;
    exploreCombinationsSums(next, candidates, target, path, allCombinationSums)

    const candidate = candidates[candidateIndex]
    path.push(candidate);
    exploreCombinationsSums(candidateIndex + 1, candidates, target - candidate, path, allCombinationSums)
    path.pop()

}






  /**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const allCombinationSums = [];
  const sortedCandidates = [...candidates].sort((a,b)=> a-b);
  
  exploreCombinationsSums(0, sortedCandidates, target, [],allCombinationSums)
  return allCombinationSums;
};

const exploreCombinationsSums = (candidateIndex, candidates, target, path,allCombinationSums) => {
  
  if(target === 0){
      allCombinationSums.push([...path])
      return;
  }
  if(target < 0)return;

  for(let currentCandidateIndex = candidateIndex; currentCandidateIndex < candidates.length;currentCandidateIndex++){
    if (currentCandidateIndex > candidateIndex &&
      candidates[currentCandidateIndex] === candidates[currentCandidateIndex - 1]) continue;
      const candidate = candidates[currentCandidateIndex]
      path.push(candidate);
      exploreCombinationsSums(currentCandidateIndex+1, candidates, target - candidate, path,allCombinationSums)
      path.pop()
  }
}


but then i figured - i never let chance for not using 1, so my option isnt only n, i need to choose everytime skip or keep. then i reach the code i sent u first

