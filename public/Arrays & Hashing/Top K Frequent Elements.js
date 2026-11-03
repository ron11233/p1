<LeetCode link>

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  nums length nums[i] size
   -  what if k 0 k > nums.length 2 num equal which one return? 

   GIVEN:
   1 <= nums.length <= 105
   -104 <= nums[i] <= 104
  k is in the range [1, the number of unique elements in the array].
  It is guaranteed that the answer is unique.



3. EXAMPLES
   normal: 4 3 4 1 3 4 3 2 5 1 
   tricky: -1 ,4 , -1      k = 1
   edge: 3 k = 1


4. APPROACHES
   1. Naive: run through k time every time find most frequent and keep in visited and add to res list.   Time O(K*n)  Space O(k)
   2. Better: save all in dict with count nums[i] count. then push to minHeap with size K if bigger dequeue then return all left in heap  Time O(klogk + n)  Space O(k(heap) + n (dict))
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #2 because optimal


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const numToCount = new Map()
    const minHeap = new MinPriorityQueue((item) => item[1]);
    const kMostFrequent = []

    for(const num of nums){
      if(!numToCount.has(num)) numToCount.set(num, 0)
      numToCount.set(num, numToCount.get(num) + 1)
    }

    for(const [num,count] of numToCount){
        minHeap.enqueue([num,count]);
        if(minHeap.size() > k) minHeap.dequeue()
    }

    while(!minHeap.isEmpty()){
      const [num, count] = minHeap.dequeue()
      kMostFrequent.push(num)
    }

    return kMostFrequent;
};



7. VERIFICATION
