Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

input grid m*n of chars in each cell, word
output- true if the word exists in the grid through connected neighbor cells - or false if isn't
rule: iterate throguh the grid and look for neighbor cells that builds the target word. 

constraints -
  m ,n sizes? 
  word max length. can word be larger than m*n? 


  m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.

ok so there can be upper AND lower case letters. 

example
r b c
o n d
x x e 
word : ron 


edge:  grid- k word - m
return false



approaches: 
through each cell try to build the word with dfs. if sucesss true else false
time: (m*n- each cell) * m*n - can go dfs all table - if word same length) so (m*n)^2
space: recursive dfs can go m*n deep and thats it. oh also need visited - so another m*n. its total m*n 

problem- each cell try to build.

better: go through each cell with visited. each cell if not starting letter keep. if find starting letter iterate neighbors continue next letter. same efficiency. 

walkthrough: 
iterate each cell
for each cell - if startWord - send to exploreIsWord function. that function will go through each neighbor try to continue the word.
it will pass itself each time if word match cut the letters till no more letters left - return true. also keep seen to avoid cycle. 







  

  /**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  
    for(let row = 0; row < board.length; row++){
        for(let column = 0; column < board[0].length; column++){
            if(board[row][column] === word[0]){
                if(word.length === 1) return true;
                const visitedCell = new Set()
                visitedCell.add(generateKey(row,column,board[0].length))
               const isWordExists = exploreIsWordExists([row,column], word.slice(1),board,visitedCell); // cut first letter from word
                if(isWordExists) return true;
            }
        }
    }
  return false;
};

const exploreIsWordExists = (cell, word,board, visited) => {
    const directions = [[-1,0],[1,0],[0,-1], [0,1] ]
    if(!word) return true;
    
    const [row,column] = cell

    for(const [rowDirection, columnDirection] of directions){
        const newRow = row + rowDirection;
        const newColumn = column + columnDirection;
      
        if(outOfBound(newRow,newColumn,board) || visited.has(generateKey(newRow,newColumn,board[0].length)) || board[newRow][newColumn] !== word[0] )continue;
        visited.add(generateKey(newRow,newColumn,board[0].length));
        const isExists = exploreIsWordExists([newRow,newColumn], word.slice(1), board,visited);
        visited.delete(generateKey(newRow,newColumn,board[0].length));
        if(isExists)return isExists;
    }
    return false
}

const generateKey = (row,column, columnsCount) => {
    return row*columnsCount + column
}

const outOfBound = (row,column,grid) => {
    const rowsCount = grid.length;
    const columnsCount = grid[0].lemgth;

    return row < 0 || row >= rowsCount || column < 0 || column >= columnsCount

}
