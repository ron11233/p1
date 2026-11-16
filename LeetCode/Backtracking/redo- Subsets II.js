Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



input int array nums
output all possible subsets 
rule: no duplications


constraints
num length 
nums[i] range

1 <= nums.length <= 10
-10 <= nums[i] <= 10



example 
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

tricky [3,3]. res - [[],[3],[33]]
edge [3] res-  [[],[3]]


  approaches: 
same as subsets 1 - keep an index and keep or skip. now we add a memo that will know which path we inserted already to avoid duplications
time: O(2^n * n)
space: O(2^n - both results and the new set).

problem: we waste a lot of space and extra checks iterating duplications

better: 
 sort first, then use skip keep- but when choose skip, skip all of the same num i chose to skip. it avoids skip keep keep skip duplication with same num 

time: sort - nlogn + 2-keep/skip^n-depth of each path*n - spread insert subset to powerset. total is 2^n * n 
space: 2^n - num of subsets*n - length of subsets


walkthrough: 
powerSet res array which is the one i return. 
create sortedNums
have a fillPowerSet(numIndex,subset,sortedNums,powerSet) function returns void
it will both keep or skip. if it decides to skip - make while as long as next val is same - go with numIndex + 1 till skip all duplicates.
also use keep. 
  base case numIndex is length of sortedNums then push subset to powerset


  /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    const powerSet = new Array();
    const sortedNums = [...nums.sort((a,b) => a-b)];

    fillPowerSet(0,[],sortedNums,powerSet)
    return powerSet;
};


const fillPowerSet = (numIndex,subset,sortedNums,powerSet) => { // returns void 
    if(numIndex === sortedNums.length){
        powerSet.push([...subset]);
        return;
    }

    subset.push(sortedNums[numIndex]);
    fillPowerSet(numIndex+1, subset, sortedNums, powerSet); // keep 
    subset.pop();

    const skippedNumIndex = findIndexAfterDuplicates(numIndex+1,sortedNums);
    
    fillPowerSet(skippedNumIndex, subset, sortedNums, powerSet); // skip
}


const findIndexAfterDuplicates = (numIndex,sortedNums) => { // returns int numIndex
  
  while(numIndex < sortedNums.length && sortedNums[numIndex] === sortedNums[numIndex-1]) numIndex++;
  return numIndex;
}


