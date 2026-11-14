You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The final answer is guaranteed to fit into a signed 32-bit integer.



input- amount int number, coins int number array
output- int number of cominations that makes the amount. if can't make any return 0
rule: can use any coin any amount of times. 

constraints
amount range. can be negetive / 0? 
coins.length can be 0 or 1? 
coins[i] can be 0 or negetive? 

1 <= coins.length <= 300
1 <= coins[i] <= 5000
All the values of coins are unique.
0 <= amount <= 5000

if amount = 0 - return 0

example 1,2,5,10 amount = 12 

tricky:

edge:  amount = 0 return 0. amount = 1 coins 2,3 return 0


approaches:
brute force- run foreach - recurse every coin usage every time effecting amount. base case when amount =0 return 1 and the for loop will return all ways from there. return the combinationscount. 
coins.length = c
time: c-options^5000-depth (heighest amount vs lowest coin).
space: o(5000) worst case. 

problem: we calc many times same question - how many times reach from amount =3 for example from amount =4 etc..

better: add memo.
every time update the amount left as key and combinations to 0 as result. for example i run 1 time i have 2 as amount and 1,2,5,10. i will iterate with loop and find 2 ways - update memo 2,2
time: o(c*5000)
space o(5000)

optimized: DP
promise: combinationsToAmount[i] will be num of combinations to reach 0 from that i. 
me: for each num that isn't 0 - run all coins with for and add 1 to each nums combinationsToAmount. 
basecase: reached real amount. 
  return  combinationsToAmount[realAmount]




  /**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function(amount, coins) {
    
};
