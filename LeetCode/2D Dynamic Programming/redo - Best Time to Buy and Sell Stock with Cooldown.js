
You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).



input - int array prices 
output- int max profit 
rules: can only hold 1 stock at a time, can have multiple transactions, after each sell must wait 1 day of cooldown (no transactions) 

constraints: 
can prices be negetive? 
can array be empty? 
  if can't make any profit return 0? 

1 <= prices.length <= 5000
0 <= prices[i] <= 1000


examples: 
normal: 3,5,7,0,2,0 return 4 buy 3 sell 7 
tricky: 0,0,0,0 return 0 | 1,2,3,4 return 0
edge: 0 return 0

approaches: 
brute force: 
iterate through each price. every iteration can either - buy/sell. if buy-just go next num and pass current stack (holding). if sell, skip also next num (cooldown). next recursion is just skip. 
time: 2-buy/sell or skip ^ n
space: O(n)

maxProft(priceIndex, holdingStock, prices) - returns max profit 
basecase: priceIndex >= prices.length- return 0. 
me: if holding stock -sell - maxProft(priceIndex + 2, profit(holdingstock-price). if don't have stock - maxProft(priceIndex + 1, price).' do it only if profit is positive. && skip - maxProft(priceIndex + 1, holdingstock). return max of both. 


problem: recalculating same problem many times 

better: add memo to keep found results. 
key- priceIndex, holdingStock(either stock val if holding or -1 if not). value - max profit.

time: n(holdingStock) * n(priceIndex) - num of states.
space: O(n^2). n is depth + n^2 for the memo 

problem: can go out of memory for recursion 

optimized: 2D DP 
maxProfitTillHere - cell represents max profit from start till this cell. 
me: 


/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    
};


