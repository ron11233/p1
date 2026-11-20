You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.




input - int array coins, int amount
output- int count of min coins to reach amount / -1 if can't 
rule: can use any number in coins array any number of times

constraints
coins length  can be 0? 
coins[i] range amount range, can be negetive?

what if length 0 and amount 0. 


1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4

examples
normal - 1,2,5 t= 10 return 2
tricky- 2,4 t= 13 return -1
edge- 3 t=0 return -1, 1,2,3 t=0 return -1 

approaches:
brute force: keep or skip. for first num, both try use, and try skip. generate all possible combinations. have a bubble up +1 for each coin u use, and return minimum between keep and skip. 
time: 2^amount/minCoin
space amount/minCoin

problem: we calculate same problem many times

better: add cache. every time we return - save to cache minCoins key-amountLeft val - minCoinCount and ofcourse everytime check if u already have answer in cache 
time: amount/minCoin - num of different states possible. max.
space: amount/minCoin. seems like as long we dont do any exponental process time will equal space in cache solutions.

problem: we might go stack overflow with coins have 1 and amount is 10^4 our depth is 10^4 since both solutions are recursion. we will go stack overflow. 

optimized: 1D DP 
minCoinsToAmount - minCoinsToAmount[i]: num of coins to reach amount
me: get min from iterating minCoinsToAmount[i+currentCoin].
base case: reached i=0. that is the result. 

prune: coin > amountLeft cut. 
time: O(amount/minCoin)
space: O(amount/minCoin)

walkthrough: 
create minCoinsToAmount - array size amount + 1 with 0 filled. 
iterate through amountIndex from amount to 0
each iteration - findMinCoinsToAmount(coins,amountIndex,minCoinsToAmount) // int num
minCoinsToAmount: iterate through all coins in a for loop - have a minCoinsCount. for each coin check if amountIndex+coin <=amount - minCoinsToAmount[amountIndex+coin]. math min on all coins. 
minCoinsToAmount[amountIndex] = findMinCoinsToAmount + 1
basecase i>=0 (count 0 since we want to check how to reach from 0 to amount - this is the final answer)
return - minCoinsToAmount[0]: if 0 and coins.length > 1 return -1. or treat length = 1 at beginning then just minCoinsToAmount[0] === 0 ? -1 : minCoinsToAmount[0]


  /**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */


var coinChange = function(coins, amount) {
    if(amount === 0) return 0
    const minCoinsToAmount = new Array(amount+1).fill(0)

    for(let amountIndex = amount - 1; amountIndex >= 0; amountIndex--){
        minCoinsToAmount[amountIndex] = findMinCoinsToAmount(coins,amountIndex,minCoinsToAmount)
    }

    return minCoinsToAmount[0] === Infinity ? -1 : minCoinsToAmount[0]
};

const findMinCoinsToAmount = (coins,amountIndex,minCoinsToAmount) => {
      let minCoinsCount = Infinity;
      for(let coinIndex = 0; coinIndex < coins.length; coinIndex++){
          const coin = coins[coinIndex];
          if(amountIndex+coin >= minCoinsToAmount.length){
            continue // value is bigger than amount - cant reach amount from this coin - beacuse no negetive coins later. 
          }

        minCoinsCount = Math.min(minCoinsCount, minCoinsToAmount[amountIndex+coin]);
      }

  return minCoinsCount + 1;
}



