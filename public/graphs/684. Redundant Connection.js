684. Redundant Connection - need to redo

In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.


    
/*
 *
 * 1. PROBLEM
 *    Input:  ...        Output: ...        Rule: ...
 *
 * 2. CONSTRAINTS → IMPLICATIONS
 *    - ...
 *
 * 3. EXAMPLES
 *    normal: ...   tricky: ...   edge: ...
 *
 * 4. APPROACHES
 *    1. Naive:   run through all vertexes from last to first - and each time try to build a tree. if success return vertex   Time O((V+E)n)  Space O(V+E)
 *    2. Better:  union find   Time O(n)  Space O(n)
 *    → implementing #2 because more efficient 
 *
 * 5. CODE below      
 *6. WALKTHROUGH: step | state | result
 */

var redundantConnection = function(edges) {

    const parent = [];
    const n = edges.length;

    for(let node = 1; node < n + 1; node++){
        parent[node] = node;
    }

    const find = (node) => {
        if(parent[node] === node) return parent[node];
        
        parent[node] = find(parent[node]);
        return parent[node]
    }

    for(const [nodeA, nodeB] of edges){
        const nodeAParent = find(nodeA);
        const nodeBParent = find(nodeB);

        if(nodeAParent === nodeBParent) return [nodeA,nodeB]
        parent[nodeAParent] = nodeBParent
    }

    
};
