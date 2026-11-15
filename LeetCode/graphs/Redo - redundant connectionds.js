<LeetCode link>

In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.




1. PROBLEM
   Input: tree with 1 cycle 
   Output: last edge we can remove and remain tree 
   Rule:  


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  max length of nodes?
   -  only one cycle guranteed?
  -

   GIVEN:
  n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.


3. EXAMPLES
   normal:1 - 3
           \ / \
           2 - 4
              /
             5
   tricky:  1 - 3
             \ /
              5
   edge:  


4. APPROACHES
   1. Naive:   try remove every edge from end and check if tree with no cycles Time O(e*v)  Space O(e+v)
   2. Better:  union find. each node is parent of itself and has rank. everytime we DFS to parent root. if not same parent take one with higher rank and union them. if same parent cycle exists Time O(e+v)  Space O(e)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {

    const rank = new Array(edges.length).fill(1);
    const parent = Array.from({length: edges.length + 1}, (_,i)=> i)

    const getRoot = (node) => {
        if(parent[node] === node) return node;
        parent[node] = getRoot()
        return parent[node]
    }
  
    for(const [edgeA, edgeB] of edges){
      
      
        const edgeARoot = getRoot(edgeA);
        const edgeBRoot = getRoot(edgeB);

        if(edgeARoot === edgeBRoot)return [edgeA,edgeB];

        if(rank[edgeARoot] > rank[edgeBRoot]){
            parent[edgeBRoot] = edgeARoot;
            rank[edgeARoot] += rank[edgeBRoot];
        }else{
          parent[edgeARoot] = edgeBRoot
          rank[edgeBRoot] += rank[edgeARoot];
        }
    }
    
};


7. VERIFICATION
