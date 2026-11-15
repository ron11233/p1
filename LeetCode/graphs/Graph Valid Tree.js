You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

Return true if the edges of the given graph make up a valid tree, and false otherwise.





 
  1. PROBLEM check if valid tree 
     Input:         Output: ...        Rule: ...
 
  2. CONSTRAINTS → IMPLICATIONS
     - limit n? can edge come twice same node A-B B-A? duplicate edges? A-B A-B. 

GIVEN 
1 <= n <= 2000
0 <= edges.length <= 5000
edges[i].length == 2
0 <= ai, bi < n
ai != bi
There are no self-loops or repeated edges.
 
  3. EXAMPLES
     normal: ...   tricky: ...   edge: ...
        3    
  4       5     8
6   7   1   2
     
  4. APPROACHES
     1. Naive: build adjaceny list. go through first node with visited and DFS. if visited all nodes and not visited - valid tree. check if visited all nodes by visited.size and n   Time O(V + E)  Space O(V + E)

     2. Better:   unionFind. create rank and parent arrays n length. find each root, if not same root union them. if same root - found cycle and its invalid tree   Time O(V+E)  Space O(V+E)
     → implementing #2 because i want to improve at unionFind
 
  5. CODE below      


    
var validTree = function(n, edges) {
    if(n-1 !== edges.length) return false;
    if(n===1) return true

    const rank = []
    const parent = []

    for(let node = 0; node < n + 1 ; node++){
        rank[node] = 1
        parent[node] = node
    }

    const findRoot = (node) => {
        if(parent[node] !== node) parent[node] = findRoot(parent[node])
        return parent[node]
    }


    for(const [nodeA, nodeB] of edges){
        const [rootA, rootB] = [findRoot(nodeA), findRoot(nodeB)]

        if(rootA === rootB) return false; //cycle

        if(rank[rootA] > rank[rootB]){
            parent[rootB] = rootA;
            rank[rootA] += rank[rootB]
        }else{
            parent[rootA] = rootB;
            rank[rootB] += rank[rootA]
        }
    }
    return true;
};




 *6. WALKTHROUGH: step | state | result


