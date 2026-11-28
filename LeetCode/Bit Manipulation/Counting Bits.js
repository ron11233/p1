Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

Do not solve it with built-in functions (i.e., like __builtin_popcount in C++).


input int n 
output- int array 
rule: each cell in array should be num of 1's in the according n[index]

constraints: 

n range? can be negetive? 
  


0 <= n <= 10^5

  examples 

Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10
Example 2:

Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

approaches: 
brute force: 
iterate n +1 times (0 till n inclusive). each run count the bits (toString.2 and loop it).
time: O(n*32) - O(n)
space: O(n) 






/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    let onesInNum = new Array(n+1).fill(0);
    let offset = 1;

    for(let numIndex = 1; numIndex < onesInNum.length; numIndex++){
        if(offset * 2 === numIndex){
            offset = numIndex; 
        }
        onesInNum[numIndex] = 1 + onesInNum[numIndex - offset];
    }
    return onesInNum
};


  /**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    
};
