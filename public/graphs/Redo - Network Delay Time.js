<LeetCode link>

You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.




1. PROBLEM
   Input:  times array of [from, to, time], n num of nodes, k startignnode
   Output:  return the minimum it takes for K to reach all nodes. -1 if impossible (some island)
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -   n size limit. can take be negetive? 
   -

   GIVEN:
       1 <= k <= n <= 100
      1 <= times.length <= 6000
      times[i].length == 3
      1 <= ui, vi <= n
      ui != vi
      0 <= wi <= 100
      All the pairs (ui, vi) are unique. (i.e., no multiple edges.)


3. EXAMPLES
   normal:I DID IN NOTEBOOK
   tricky:  
   edge: island


4. APPROACHES
   1. Naive:  running through all k neighbors. each time new visited - but always 1 list of n length with time it gets from K to that node. DFS and always update minimum in shared length
     Time O(kNeighbor(worst is n i guess if flat) * n(all nodes))  Space O(n)- adjancylist)
problem is we visit every node N times! 

   2. Better: shortestPath. have a minHeap by time. every time add all neighbors to meanheap (BFS) and then take the min time always - with visited. we iterate once each node. we finish when stack empty OR visited size = n.  Time O(n- each node visited once * log n - time to dequeue minHeap)  Space O(n) - adjancy list
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
      const fromToNode = new Map();
      const visited = new Set()
      const minHeap = new MinPriorityQueue(([node,time]) =>  time);
      let minTime = -Infinity;
  
      for(const [fromNode,toNode,time] of times){
          if(!fromToNode.has(fromNode))fromToNode.set(fromNode, []);
          fromToNode.get(fromNode).push([toNode,time]);
      }


     minHeap.enqueue([k,0])

    while(!minHeap.isEmpty() && visited.size < n){
        const [node, time] = minHeap.dequeue();
        if(visited.has(node))continue

        visited.add(node)
        minTime = Math.max(time,minTime)
      
        const nodeNeighbors = fromToNode.get(node) || []
      
        for(const [neighborNode, neighborTime] of nodeNeighbors){
           minHeap.enqueue([neighborNode, time + neighborTime]);
        }
    }
  
  if(visited.size !== n ) return -1;
  return minTime;
};


7. VERIFICATION
