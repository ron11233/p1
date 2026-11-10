You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.



input array int nums - represents the jump i can make from that index
output- true if i can land exactly at last index otherwise false
rule: from each index i can jump to curr index + val of that nums[i]. 

constraints
max nums length? 
nums[i] max? 
can num[i] > nums.length-1

1 <= nums.length <= 104
0 <= nums[i] <= 105



  examples
normal 2,2,0,1,-1

tricky 

edge 0 




approaches:
brute force - 
  10^5 optional choice (nums[i] val). i can do either 1 stop 2step 3 step till 10^5. and the depth worst case will be 10^4 with 1 as nums[i] try to go nums.length which is 10^4. so time complexity is (10^5)10^4. space complexity is depth which is 10^4 as we mentioned before

waste: i do recalculations of cals i already made before every time. for example when i reach index[3] is it possible to reach or not - need calc once. reminds DP alot tbh. but probably there's greedy more efficient way. i would go for DP first and then maybe see i can do with greedy. so DP would be my Better appraoch and then maybe i will figure can be Optimized with greedy.


better: go from last index to first DP style. 
  dp[nums.length-1] will be true
  go i-- each time. run with for from 1 till the val. if 1 of them is true i am true - and continue. if value is >= nums.length-1 its true.
  time O(n)
  space(O(n))

optimized: 
same as DP but everytime rememeber only the last index that i could reach from to the end. start with n-1 (last index). then if n-2 can reach save only n-2 index like that. return - if last value could reach the lastReachable. 
  time (O(n))
space (O(1))
i know at the end i understood i can also in DP do just O(n) just the val and not need to actually go through all - also save last reachable 






  /**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if(nums.length === 1 )return true; //reached last index (first is last)
  
    let prevReachable = nums.length-1;
    for(let numIndex = nums.length-2; numIndex >= 0; numIndex--){
        const currentNum = nums[numIndex];

        const canReachLastReachable = currentNum + numIndex >= prevReachable;
        if(canReachLastReachable) prevReachable=numIndex;
    }
  
   return prevReachable === 0;
};





