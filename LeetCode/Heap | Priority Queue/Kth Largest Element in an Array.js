Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 input - array of nums and int k 
  output kth largest element in the array
rule: if items were ordered desc by value we will take number k of them 

constraints 

can k be bigger than nums length
nums length limits
if nums length 0 return ? 

can have negetive nums? 


given 
- 1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104


  examples: 

-5,4,3,-2 k=2 return - 3 

tricky 5 5 4 k=2 return - 5

edge 4 k=1 return - 4 


approaches

bruteforce - sort the array desc and go for the kth element- time - nlogn space- O(1)  . also can iterate k times - each time finding max value of array. keeping seen for skipping counted indexes. n^2 with on space

optimized- maxHeap put entire num into it - nlogn - then dequeue k-1 times. nlogn + klogn - sum is nlogn. more optimzed - minHeap - k+1size. add till reach k+1 then dequeue (will kick smallest) and return last pop. n * logk time and O(k) space



walkthrough
create minheap
iterate through nums
as long as heap size < k +1 enqueue
when reaches size - dequeue

when finish iterating return the second dequeue


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const largestNums = new MinPriorityQueue();

    for(const num of nums){
        if(largestNums.size() === k+1) largestNums.dequeue();
        largestNums.enqueue(num);
    }

    if(largestNums.size() === k+1)largestNums.dequeue();
  return largestNums.dequeue()
};
