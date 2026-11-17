Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.


input - int array nums, int k
output- int array 
rule: K most frequent elemnts

constraints
nums.length
k range
nums[i]range
can k be bigger than unique(nums)?

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.


examples
normal: 3,3,3,-32,-32,1,4 k = 2
tricky: 1,2 k=2 
edge: -2 k=1


approaches: 
brute force: outer for loop for 0 to k. each iteration find the most freq element. then put in set to avoid recounting next time. count by map and add to array of KthlarElements
time: O(k*n)
space: O(n)

problem: counting from beginning every time, making unecessary iterations

better: 
count all elements into a map of num: occurancesCount. then push them to minHeap of k+1 length. if heap size is k+1 dequeue - will throw the min of them. after finish iterating the map - add all heap items to array and return

u - unique nums in nums
time: O(n- building map + ulogk - u times push to minHeap of k size + ulogk - dequeuing to create kthLargestElements res = n + ulogk)
space: O(u - map, k res array, kminHeap = u+k)




  /**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    const numsOcurrances = mapNumsToOccurances(nums);
    const kthLargestElementsHeap = findKthLargestElements(numsOcurrances, k);
    const kthLargestElementsArray = queueToArray(kthLargestElementsHeap);
    return kthLargestElementsArray;
};

const mapNumsToOccurances = (nums) => {
  const numsOcurrances = new Map(); 

  for(const num of nums){
      if(!numsOcurrances.has(num))numsOcurrances.set(num,0);
      numsOcurrances.set(num, numsOcurrances.get(num) + 1);
  }
  return numsOcurrances;
}

const findKthLargestElements = (numsOcurrancse, k) => {
    const minHeap = new MinPriorityQueue((args)  => args[1]);

    for([num,occurances] of numsOcurrancse.entries()){
        minHeap.enqueue([num,occurances]);
        if(minHeap.size() > k) minHeap.dequeue();
    }
    return minHeap;
}

const queueToArray = (heap) => {
    const array = [];
    while(!heap.isEmpty())array.push(heap.dequeue()[0]);
    return array;
}


