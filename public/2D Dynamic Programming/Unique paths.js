



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
