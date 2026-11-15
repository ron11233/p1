<LeetCode link>
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - nums.length? nums[i] range? 
   - unique elements? can have negetive elements? 
    -nums.length = 0 return -1? 

   GIVEN:
   n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.


3. EXAMPLES
   normal: 2 3 7 8 11 -5 1 
   tricky:
   edge:


4. APPROACHES
   1. Naive:   look all nums for min Time O(n)  Space O(1)
   2. Better:   binary search Time O(log(n))  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1 

    while(left<right){
        const mid = Math.floor((left+right)/2);
        if(nums[mid] > nums[right]) left = mid + 1
        else{
            right = mid;
        }
    }
    return nums[left]
};

7. VERIFICATION
