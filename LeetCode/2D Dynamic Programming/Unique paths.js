



/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const directions =[[1,0],[0,1]]
    const numOfUniquePaths = uniquePathsCount(0,0,m,n,directions)
    return numOfUniquePaths;
};


const uniquePathsCount = (row,column,rowsCount,columnsCount,directions) => {
    if(row === rowsCount-1 && column === columnsCount - 1) return 1;

    let currentUniquePaths = 0;
    for(const [rowsToAdd, columnsToAdd] of directions){
       const newRow = row + rowsToAdd; 
       const newColumn = column + columnsToAdd;
       if(!outOfBound(newRow,newColumn,rowsCount,columnsCount)){
          currentUniquePaths += uniquePathsCount(newRow,newColumn,rowsCount,columnsCount,directions);
       }
    }

   return currentUniquePaths;
}


const outOfBound = (row,column,rowsCount,columnsCount) => {
    return row >= rowsCount || column >= columnsCount

}








/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePathsWithMemo = function(m, n) {
    const directions =[[1,0],[0,1]]
    const numOfUniquePaths = uniquePathsCount(0,0,m,n,directions)
    return numOfUniquePaths;
};


const uniquePathsCount = (row,column,rowsCount,columnsCount,directions, uniquePathsMemo = new Map()) => {
    if(row === rowsCount-1 && column === columnsCount - 1) return 1;
    if(uniquePathsMemo.has(key(row,column,columnsCount))) return uniquePathsMemo.get(key(row,column,columnsCount))
    let currentUniquePaths = 0;
    for(const [rowsToAdd, columnsToAdd] of directions){
       const newRow = row + rowsToAdd; 
       const newColumn = column + columnsToAdd;
       if(!outOfBound(newRow,newColumn,rowsCount,columnsCount)){
          currentUniquePaths += uniquePathsCount(newRow,newColumn,rowsCount,columnsCount,directions,uniquePathsMemo);
       }
    }
    uniquePathsMemo.set(key(row,column,columnsCount), (uniquePathsMemo.get(key(row,column,columnsCount)) || 0) + currentUniquePaths)
   return currentUniquePaths;
}

const key = (row,column,columnsCount) => {
    return row*columnsCount + column
}


const outOfBound = (row,column,rowsCount,columnsCount) => {
    return row >= rowsCount || column >= columnsCount

}







// promise: uniquePathsCounts[i][j] = num of ways to get n - 1 m - 1
// me: go right and top - add 1 to their cells and continue iteration on them
// basecase: outofbound or reached 0 0
// iteration: with queue / stack ? DFS / BFS options



var uniquePaths2DP = function (m, n) {
    const directions = [[1, 0], [0, 1]];
    const uniquePathsCounts = create2DTable(m, n);
    uniquePathsCounts[m-1][n-1] = 1;
    
    uniquePathsCount(m,n,directions, uniquePathsCounts)
    return uniquePathsCounts[0][0];
};


const uniquePathsCount = (rowsCount,columnsCount,directions, uniquePathsCounts) => {
    
        for(let row = rowsCount - 1; row >=0; row--){
            for(column = columnsCount-1; column >=0; column--){
                if(row === rowsCount.length-1 && column === columnsCount.length-1)continue;

                for(const [rowsToAdd, columnsToAdd] of directions){
                    const newRow = row + rowsToAdd;
                    const newColumn = column + columnsToAdd;
                    if(!outOfBound(newRow,newColumn,rowsCount,columnsCount)){
                        uniquePathsCounts[row][column] += uniquePathsCounts[newRow][newColumn]
                    }
                }
            }
        }
} 

const outOfBound = (row,column,rowsCount,columnsCount) => {
    return row >= rowsCount || column >= columnsCount
}


const create2DTable = (rowsCount, columnsCount) => {
    const table = new Array()
    for (let row = 0; row < rowsCount; row++) {
        table[row] = new Array();
        for (let column = 0; column < columnsCount; column++) {
            table[row][column] = 0
        }
    }
    return table;
}
