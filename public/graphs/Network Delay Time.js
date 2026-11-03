
<LeetCode link>

You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.


1. PROBLEM
   Input: n, timeList, k - random node 
   Output: return minimum take from k node to all other nodes
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - k must be 1<=n?
   - 1<=ui, vi <=n? 
   - wi value limits? 
   - n value limits? 
   

   GIVEN:
1 <= k <= n <= 100
1 <= times.length <= 6000
times[i].length == 3
1 <= ui, vi <= n
ui != vi
0 <= wi <= 100
All the pairs (ui, vi) are unique. (i.e., no multiple edges.)



  Alright. so if theres isolated node - return -1; otherwise - return time gets from random K to all other nodes.
3. EXAMPLES
   normal: i did in notebook
   tricky: 
   edge: 


4. APPROACHES
   1. Naive: DFS from k to all other nodes. dict for seen and dict for adjancylist to know neighbors. dict of seen will have seenNodenum and Time so we can compare time and adjust if we cross by this num again. save max time only, and at end check if seenDictLength === n    Time O(V+E)  Space O(V+E)
   2. Better:    Time O(...)  Space O(...)
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
      
    const timeToK = new Array(n+1).fill(Infinity);
    for(const [node, toNode, time] of times){
      if(!fromToNode.has(node))fromToNode.set(node, [])
      fromToNode.get(node).push([time, toNode])
    }

  
    const minHeap = new MinPriorityQueue((slot) => slot[0]);
    minHeap.enqueue([0, k])
    
    timeToK[k] = 0

    while(!minHeap.isEmpty()){
      const [time, node] = minHeap.dequeue();
      if(time >= timeToK[node])continue
      
      for(const [neighborTime, neighborNode ] of fromToNode.get(node) ?? []){
          const  newTime = neighborTime + time 
          if(newTime > timeToK[neighborNode])continue
          timeToK[neighborNode] = newTime
          minHeap.enqueue([newTime, neighborNode]);
      }
        
    }
    const maxTime = Math.max(...timeToK.slice(1))
    return maxTime === Infinity ? -1 : maxTime;
};


7. VERIFICATION
