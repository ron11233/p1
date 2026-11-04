<LeetCode link>

There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.




1. PROBLEM
   Input: 
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -m n sizes? height ranges? 
   -

   GIVEN:
    Constraints:
    
    m == heights.length
    n == heights[r].length
    1 <= m, n <= 200
    0 <= heights[r][c] <= 105


3. EXAMPLES
   normal:    0    20   100
              99   150   50 
              100  130   40 
   tricky:
   edge:


4. APPROACHES
   1. Naive:  for each m*n - BFS to find canreachPacific can reachAtlantic   Time O((m*n)^2)  Space O(m*n)
   2. Better:  3 sets can reach atlantic pacific and visited. every time reach any update there never go same height twice.  DFS.    Time O(m*n)  Space O(m*n)
   3. Optimal: iterate reverse - go from all of the edges of the array (row 0 column 0 row n-1 column n-1 and find from there) DFS  Time O(m*n)  Space O(m*n)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    const canReachPacific = new Set() 
    const canReachAtlantic = new Set()
    const iterateFirst = []

    for(const i = 0; i < heights[0].length; i++){
      canReachPacific.add([0,i]);
      canReachAtlantic.add([heights.length-1, i])
    }

    for(let i = 0; i < heights.length; i++){
      canReachPacific.add([i,0];
      canReachAtlantic.add([i, heights[0].length-1])
    }

  const runFirst = [...canReachPacific, ...canReachAtlantic]

  for(i = 0; i < runFirst.length; i++){
        const [row,column] = runFirst[i];
        let currentCanReachPacific = canReachPacific.has([row,column])
        let currentCanReachAtlantic = canReachAtlantic.has([row,column])

        const traverse = (row,column) => {
              for(const [rowToAdd, columnToAdd] of directions){
                    const newRow = row + rowToAdd
                    const newColumn = column + columnToAdd
                
                    if(newRow === 0 || newColumn === 0){
                        canReachPacific.add([newRow,newColumn])
                    }
                    if(newRow === heights.length-1 || newColumn === heights[0].length-1){
                      canReachAtlantic.add([newRow,newColumn])
                    }
                    
              }
        }
    
        traverse(row,column)
  
        
  }
};


7. VERIFICATION
