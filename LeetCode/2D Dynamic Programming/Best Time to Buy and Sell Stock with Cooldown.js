You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).


input - prices int array
output- max profit int num 
rule: can buy and sell as many times. after each sell can't buy the next day. 


constraints 
price[i] range and price.length range. can price be negetive can pricelength be 0 



1 <= prices.length <= 5000
0 <= prices[i] <= 1000



princes.length = 1 return 0 - cant make profit

example 7 9 1 10 3 return - 9 

tricky: 0000 return 0 

edge:  4 return 0 

approaches:
bruteforce- every step: if i dont have stock now - i can either buy or skip. if i have stock i can either sell and jump 2 (1 day cd) or wait with sell (jump 1). 

time: 2-sell/buy 1option /wait^n - num of depth
space: O(n)

promise: return maxProfit for index. gets currentOwnStock (if bought), current priceIndex, and prices. 
me: return max between buy/sell OR skip. if sold - add + the diff between buy and sell in return. 
basecase: priceindex = prices.length. return 0;

problem: checking every single variation. 

better: add memo to keep returned values. 
time: O(n)
space O(n)

optimized: 

dp[i][j] max profit for prices[i][didbuyorsell]


  /**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};





