You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.



input- int n, ints array [ai,bi]
output- int num of connected components
rule: undirected graphs, need to know how many  nodes groups there are.


constraints 
n size
edges length

1 <= n <= 2000
1 <= edges.length <= 5000
edges[i] = [ai, bi]
ai != bi
There are no repeated edges.


example
normal: n=7 1,2 5,6 2,3 6,7 return 2 

tricky 

edge n=1  how can be n=1 if must be edge where ai != bi? lol


approaches:
brute force: 
build adjancy list, then iterate on it with visited. each iteration is numOfConnectedComponents++. 

  edges length = e
  nodes = v
time: O(e-build adjancy list + v - iterate all nodes = v+e).
space: map is v+e, seen is v, recursion depth is v = v + e

walkthrough: 
make numOfConnectedComponents int - and return it as result
fromToNode = create func createAdjancyList(edges) // returns map 
then create exploreConnectedComponents(node, fromToNode, seen)
then iterate n with for. for each n - if not seen node - send to exploreConnectedComponents with a seen. he will mark all connected to that node
then numOfConnectedComponents++. 
return numOfConnectedComponents


  /**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
    const fromToNode = createAdjancyList(edges) // returns map 
    const visitedNodes = new Set();
    let numOfConnectedComponents = 0;
  
    for(let nodeIndex = 0; nodeIndex < n; nodeIndex++){
        if(!visitedNodes.has(nodeIndex)){
          visitedNodes.add(nodeIndex)
          markConnectedComponents(nodeIndex, fromToNode, visitedNodes);
          numOfConnectedComponents++;
        }
    }
  return numOfConnectedComponents;
};

const markConnectedComponents = (nodeIndex, fromToNode, visitedNodes) => { //returns void
    const nodeNeighbors = fromToNode.get(nodeIndex) || [];

    for(let neighborIndex = 0; neighborIndex < nodeNeighbors.length; neighborIndex++){
        if(!visitedNodes.has(nodeNeighbors[neighborIndex])){
            visitedNodes.add(nodeNeighbors[neighborIndex])
            markConnectedComponents(nodeNeighbors[neighborIndex], fromToNode, visitedNodes)
        }
    }
}

const createAdjancyList = (edges) => { //returns map 
    const fromToNode = new Map();

    for(const [nodeIndex, toNodeIndex] of edges){
        if(!fromToNode.has(nodeIndex))fromToNode.set(nodeIndex, []);
        if(!fromToNode.has(toNodeIndex)) fromToNode.set(toNodeIndex, []);
        fromToNode.get(toNodeIndex).push(nodeIndex);
        fromToNode.get(nodeIndex).push(toNodeIndex);
    }
  return fromToNode;
}

