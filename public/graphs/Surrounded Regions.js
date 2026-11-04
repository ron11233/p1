You are given an m x n matrix board containing letters 'X' and 'O', capture regions that are surrounded:

Connect: A cell is connected to adjacent cells horizontally or vertically.
Region: To form a region connect every 'O' cell.
Surround: A region is surrounded if none of the 'O' cells in that region are on the edge of the board. Such regions are completely enclosed by 'X' cells.
To capture a surrounded region, replace all 'O's with 'X's in-place within the original board. You do not need to return anything.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  m n size? 
   -

   GIVEN:
    m == board.length
    n == board[i].length
    1 <= m, n <= 200
    board[i][j] is 'X' or 'O'.


3. EXAMPLES
   normal:
   tricky:
   edge:


4. APPROACHES
   1. Naive: each cell run DFS check if 'O'. check all neighbors also DFS 'O' if reach Bound set them all 'O'    Time O((m*n)^2)  Space O(m*n)
   2. Better: same as pacific. add all 'O' close to bound - then traverse all 'O' and mark them as visited. then go through all m*n and every slot not inside which is O should turn to X Time O(M*N)  Space O(M*N)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

const directions = [[-1,0], [1,0], [0,-1], [0,1]]
const key = (char1,char2) => {
  return `${char1},${char2}`
}
var solve = function(board) {
    
const outOfBoard = (row,column) => {
    return row < 0 || row >= board.length || column < 0 || column >= board[0].length
}
      const queue = new Queue([])
      const visited = new Set()
  
      for(let i = 0; i < board[0].length; i++){
          if(board[0][i] === 'O') {
            queue.enqueue([0,i])
            visited.add(key(0,i));
          };

            if(board[board.length-1][i] === 'O') {
            queue.enqueue([board.length-1,i])
            visited.add(key(board.length-1,i));
          };

      }

      for(let i = 0; i < board.length; i++){
            if(board[i][0] === 'O') {
            queue.enqueue([i,0])
            visited.add(key(i,0));
          };

            if(board[i][board[0].length-1] === 'O') {
            queue.enqueue([i,board[0].length-1])
            visited.add(key(i,board[0].length-1));
          };
      }
      
      while(!queue.isEmpty()){
          const [row,column] = queue.dequeue()

          for(const [directionRow, directionColumn] of directions){
              const newRow = row + directionRow;
              const newColumn = column + directionColumn;

              if(visited.has(key(newRow,newColumn)) || outOfBoard(newRow,newColumn) || board[newRow][newColumn] !== 'O') continue;

              visited.add(key(newRow,newColumn));
              queue.enqueue([newRow,newColumn]);
          }
      }

  for(let row = 0; row < board.length; row++){
    for(let column =0; column < board[0].length; column++){
        if(!visited.has(key(row,column)) && board[row][column] === 'O') board[row][column] = 'X'
    }
  }
};


7. VERIFICATION
