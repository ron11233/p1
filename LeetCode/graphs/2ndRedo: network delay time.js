You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.


input- times with fromnode - tonode-time, k (some node)
output- shortest time it takes from k to the farest(time related) node
rule: each node can have few ways of arrival, need to find shortest path to each node from k. if theres island (cant reach all nodes) return -1

n range?
times range

1 <= k <= n <= 100
1 <= times.length <= 6000
times[i].length == 3
1 <= ui, vi <= n
ui != vi
0 <= wi <= 100
All the pairs (ui, vi) are unique. (i.e., no multiple edges.)



  example in notebook



approaches

brute force: 
idk how not to inf loop while still checking every route. perhapes param route for the dfs with seen object on that

optimal - 
  minHeap on time.
  first of all make adjancy list.
  then go from K with min heap add all neighbors. 
  go each time on min time one. create array size 100 (till 100 nodes) or key val of timeToNode. each one we visit we update time. we can keep visited only. we iterate all route when visited = n
  time complexity- for each node we do logn push to heap. we see each node once. so nlogn. space complexity is - seen is n, heap is max width (less than n). thats it. so O(n)




  
















/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

var networkDelayTime = function(times, n, k) {
  const seen = new Set();  
  const fromToNode = createFromToMap(times);
  const minHeap = new MinPriorityQueue(([toNode,time]) => time );
  minHeap.enqueue([k,0])
  let timeSum = 0;
  
  while(!minHeap.isEmpty() && seen.size < n){
        const [toNode, time] = minHeap.dequeue();
        if(seen.has(toNode))continue
        timeSum =  time;
        seen.add(toNode);
        const neighbors = fromToNode.get(toNode) || [];

        for(const [neighborNode, timeToNeighbor] of neighbors){
              minHeap.enqueue([neighborNode,time + timeToNeighbor]);
        }
  }

  
  return seen.size !== n ? -1 : timeSum
};


const createFromToMap = (times) => {
    const fromToNode = new Map();
    for([fromNode, toNode, time] of times){
        if(!fromToNode.has(fromNode))fromToNode.set(fromNode, []);
        fromToNode.get(fromNode).push([toNode,time]);
    }
  return fromToNode;
}
