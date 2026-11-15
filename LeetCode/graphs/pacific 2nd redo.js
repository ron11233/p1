/**
 * @param {number[][]} heights
 * @return {number[][]}
 */




const key = (str1, str2) => {
    return `${str1},${str2}`
}

const directions = [[-1, 0],[1, 0], [0, -1], [0, 1]]

const outOfBound = (row,column,rowsCount,columnsCount) => {
    return row < 0 || row >= rowsCount || column < 0 || column >= columnsCount
}

var pacificAtlantic = function (heights) {
    const rowsCount = heights.length
    const columnsCount = heights[0].length
    const canReachPacific = new Set();
    const canReachAtlantic = new Set();
    neighborsPacific = new Queue()
    neighborsAtlantic = new Queue()
    const canReachBoth = []

    const addInitialPacific = () => {
        let row = 0
        for (let column = 0; column < columnsCount; column++) {
            canReachPacific.add(key(row, column));
            neighborsPacific.enqueue([row, column])
        }

        column = 0
        for (row = 0; row < rowsCount; row++) {
            canReachPacific.add(key(row, column));
            neighborsPacific.enqueue([row, column])
        }
    }


    const addInitialAtlantic = () => {
        let row = rowsCount - 1
        for (let column = 0; column < columnsCount; column++) {
            canReachAtlantic.add(key(row, column));
            neighborsAtlantic.enqueue([row, column])
        }

        column = columnsCount - 1
        for (row = 0; row < rowsCount; row++) {
            canReachAtlantic.add(key(row, column));
            neighborsAtlantic.enqueue([row, column])
        }
    }

    addInitialPacific(canReachPacific, neighborsPacific);
    addInitialAtlantic(canReachAtlantic, neighborsAtlantic)

    const exploreCanReach = (visitedCanReach, canReachToExplore) => {

        while (!canReachToExplore.isEmpty()) {
            const [row, column] = canReachToExplore.dequeue();

            for (const [rowsToAdd, columnsToAdd] of directions) {
                const newRow = row + rowsToAdd;
                const newColumn = column + columnsToAdd;

                if (outOfBound(newRow, newColumn,rowsCount, columnsCount) || visitedCanReach.has(key(newRow, newColumn)) || heights[newRow][newColumn] < heights[row][column]) continue
                visitedCanReach.add(key(newRow, newColumn));
                canReachToExplore.enqueue([newRow, newColumn])
            }
        }
    }

    exploreCanReach(canReachPacific, neighborsPacific)
    exploreCanReach(canReachAtlantic, neighborsAtlantic)

    const exploreCanReachBoth = () => {
        for (indexKey of canReachPacific) {
            if (canReachAtlantic.has(indexKey)) canReachBoth.push(indexKey.split(",").map(Number));
        }
    }

    exploreCanReachBoth();
    return canReachBoth;

};



