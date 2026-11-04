<LeetCode link>

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.




1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - m n limits
   - can numbers repeat? 
    - CAN HAVE negetive numbers? 

   GIVEN:
      Constraints:
      
      m == matrix.length
      n == matrix[i].length
      1 <= m, n <= 100
      -104 <= matrix[i][j], target <= 104


3. EXAMPLES
   normal: 1 2 3, 4 5 6 , 7 8 9 
   tricky:
   edge:


4. APPROACHES
   1. Naive: just iterate all m*n and look for num     Time O(n)  Space O(1)
   2. Better: binary search.    Time O(log(n))  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let left = 0;
    const rows = matrix.length;
    const columns = matrix[0].length
   
    let right = (rows * columns) -1

    while(left<=right){
       let mid = Math.floor((right+left)/2)
       const midRow = Math.floor(mid/columns);
       const midColumn = mid%columns;

       if(matrix[midRow][midColumn] === target)return true
       if(matrix[midRow][midColumn] > target) right = mid - 1
       else{
          left = mid + 1
       }
    }
   return false; 
};


7. VERIFICATION
