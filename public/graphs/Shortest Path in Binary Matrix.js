
https://leetcode.com/problems/shortest-path-in-binary-matrix/description/?envType=company&envId=google&favoriteSlug=google-six-months

Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.


1. PROBLEM
   Input:grid
   Output:return shortest clear path or -1 
   Rule:

   traverse find clear path - if not -1 

2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - what is inside matrix slot (0/1 i assume)
   - (0,0) gurantee to be 0? 
   - if n = 1 just return 1? 
     n = 0 return 0? 
     whats n range



   GIVEN:
Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] is 0 or 1


Okay so n=0 not exist
i assume n=1 return 1
and 0,0 can be 1 , that case just return -1 
btw also add n-1 n-1 same treatment as 0,0 


3. EXAMPLES
   normal: 0 0 1
           0 1 1
           1 0 0

   tricky:  0 1 1
            1 1 0

   edge: 1 0 
         0 1


4. APPROACHES
   1. Naive:    Time O(...)  Space O(...)
   2. Better: DFS from 0,0 go all directions every iteration. if all neighbors cant find path - return false  Time O(n^2)  Space O(n^2)
      i changed my answer after reading SHORTEST - to BFS. 
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #2 because only solution i found. i couldn't find a bruteforce only this solution 


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function(grid) {
    const visited = new Set()
    const gridLength = grid.length;
    const directions = [[-1,0], [-1,-1], [0,-1],[1,-1], [1,0], [1,1],[0,1], [-1,1]];
  
    if(grid[0][0] !== 0 || grid[gridLength-1][gridLength -1] !== 0) return -1;
    if(gridLength === 1) return 1

    
    const getShortetsPath = (row,column) => {
      const queue = new Queue([[row,column]])
      visited.add(row*gridLength + column);
      let pathLength = 1;
      
      while(!queue.isEmpty()){
          const currQueueSize = queue.size();

          for(let queueSizeCounter = 0; queueSizeCounter < currQueueSize; queueSizeCounter++){
              const [currRow,currColumn] = queue.dequeue();

              for(let [rowToAdd, columnToAdd] of directions){
                  const newRow = currRow + rowToAdd;
                  const newColumn =  currColumn + columnToAdd;
                  if(outOfBound(newRow,newColumn, gridLength) || grid[newRow][newColumn] !== 0 || visited.has(newRow*gridLength+newColumn)) continue;

                  if(newRow === gridLength -1 && newColumn === gridLength -1) return pathLength + 1;
                  queue.enqueue([newRow, newColumn])
                  visited.add(newRow*gridLength+newColumn)
            }

            if(queue.isEmpty()) return -1;
            
         
          }
         pathLength++;
        
      }

      return -1;
    }

  return getShortetsPath(0,0);
};

const outOfBound = (row,column,length) => {
    return (row < 0 || row >= length || column < 0 || column >= length)

}
7. VERIFICATION

