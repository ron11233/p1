Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


input- array of ints num that may contain duplicates.
output- all subsets
rule: each subset is a choice of which indexes of the array to use - from none to all, each can be used once


constraints: 
array nums max length? 
nums[i] range? 


1 <= nums.length <= 10
-10 <= nums[i] <= 10

example: 1,2,2 [[], [1], [2], [1,2], [1,2,2] [2,2]


  approaches: 
i can iterate all items with cutting each time the array by the number used. 

  time: n^n - for 3 items - 3 choice then 2 then 1 and level are 3. 

  extra space: max recursion depth is n and we keep 1 path whcih is n so O(n) overall. oh i also keep the splited array! its on too. so n*n n^2  
  space:n!*n - n! leaf with [...path] each time


i already know problem with my approache is i dont get to add [], [1]



  runthrough:
basecase- when reach numslength is 0. push to results and stop
what are my options- iterate all array, and send to next call the nums without my item while putting it in path









  /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
   const allSubsets = [];
   const sortedNums = [...nums].sort((a,b) => a-b)
   exploreSubsets(0,[], sortedNums, allSubsets)
    
  return allSubsets
};




const exploreSubsets = (i,path, nums, allSubsets) => {

    if(nums.length === i){
        allSubsets.push([...path]);
        return
    }

    let next = i+1;
    while(next < nums.length && nums[i] === nums[next]) next++;
    exploreSubsets(next, path, nums, allSubsets);
    
    path.push(nums[i]);
    exploreSubsets(i+1,path,nums,allSubsets);
    path.pop();


}


