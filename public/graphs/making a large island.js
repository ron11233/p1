/**
 * @param {number[][]} grid
 * @return {number}
 */
const outOfBound = (row, column, rowsCount, columnsCount) => {
    return row < 0 || row >= rowsCount || column < 0 || column >= columnsCount;
}

const largestIsland = (grid) => {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let maxLargestIsland = 0;
    const charToIslandSize = new Map();
    let charIndex = 97;
    const rowsCount = grid.length;
    const columnsCount = grid[0].length;

    const exploreIsland = (row, column) => {
        let currentIslandSize = 1
        const cellsToVisit = new Queue([]);
        cellsToVisit.enqueue([row, column]);
        grid[row][column] = String.fromCharCode(charIndex)

        while (!cellsToVisit.isEmpty()) {
            const [currRow, currColumn] = cellsToVisit.dequeue()

            for (const [rowToAdd, columnToAdd] of directions) {
                const newRow = currRow + rowToAdd;
                const newColumn = currColumn + columnToAdd;

                if (outOfBound(newRow, newColumn, rowsCount, columnsCount) || grid[newRow][newColumn] !== 1) continue;

                grid[newRow][newColumn] = String.fromCharCode(charIndex)
                currentIslandSize++;
                cellsToVisit.enqueue([newRow, newColumn])
            }
        }
        return currentIslandSize
    }

    const mapExistingIslands = () => {
        for (let row = 0; row < rowsCount; row++) {
            for (let column = 0; column < columnsCount; column++) {
                if (grid[row][column] !== 1) continue

                const currentIslandSize = exploreIsland(row, column);

                charToIslandSize.set(String.fromCharCode(charIndex), currentIslandSize)
                charIndex++;
            }
        }
    }

    mapExistingIslands();


    const countNeighborIslands = (row, column) => {
        let neighborIslandsSumSize = 1
        const seen = new Set();
        for (const [rowsCountToAdd, columnsCountToAdd] of directions) {
            const newRow = row + rowsCountToAdd;
            const newColumn = column + columnsCountToAdd;
            if (outOfBound(newRow, newColumn, rowsCount, columnsCount) || grid[newRow][newColumn] === 0 || seen.has(grid[newRow][newColumn])) continue
            seen.add(grid[newRow][newColumn]);
            const currentIslandSize = charToIslandSize.get(grid[newRow][newColumn]);
            neighborIslandsSumSize += currentIslandSize;
        }
        return neighborIslandsSumSize;
    }


    const exploreNeighborIslands = () => {
        for (let row = 0; row < rowsCount; row++) {
            for (let column = 0; column < columnsCount; column++) {
                if (grid[row][column] !== 0) continue;

                const currentIslandSize = countNeighborIslands(row, column);
                maxLargestIsland = Math.max(maxLargestIsland, currentIslandSize);

            }
        }

    }


    exploreNeighborIslands();

    return maxLargestIsland === 0 ? rowsCount * columnsCount : maxLargestIsland;
}
