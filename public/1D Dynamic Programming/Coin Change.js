You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

input - int coins array of different coin values, and an amount target int 
output- fewest num of coins. int number
rule: can use all coins multiple time. reach the amount with any coin and any number of usages 

constraints
coins length? coins[i] range? 
  amount range? 

  1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104

amount = 0 cant reach return -1 immidiatly. 

example 
normal  10,5,2,1    amount = 15
tricky 5,6,7 amount = 4
edge 10,4,3 amount = 0



approaches: 
i can do backtracking. iterate all coins. each iteration pick the coin - and send next recursion with amount-coin. 
time n^(lowestCoin/amount(max104))
space: lowestCoin/amount(max104)

as i solve better approach i understand i dont need backtracking. i can just shot all directions all the them. recursion with all coins everytime. no need to take out of path. path is only coinCounter
promise-lowestNumOfCoinsToAmount
me: iterate all coins - update minUsageOfCoins and return it
basecase: amount = 0 - return numOfCoins



this is problematic - since we solve the same problem again and again. for exampel we iterate 10 5 2 1 separatly. then both on 2 times 5 and in 1 time 10 we have same problem - amount is left with 5. so we want to solve it once and remember our result. that would give us time complexity of n*lowestCoin/amount(max104) and space of depth rec - lowestCoin/amount(max104)

promise: lowestNumOfCoinsToAmount
me: iterate all coins - update minUsageOfCoins and return it. save result. 
basecase: amount = 0 - return numOfCoins



now optimized DP approach 
promise lowestNumOfCoinsToAmount 
me: start 0 = 0. save on for all of starting coins in their lowestNumOfCoinsToAmount[coinVal]. then run from 2. try build 2. try lowestNumOfCoinsToAmount[1] + 1. lowestNumOfCoinsToAmount[3]... etc like that. until we reach amount. every time i need to find lowest way to get.  
base case: start at 0, so reach amount 15 is basecase. above 15 stop and return -1 
time- n*lowestCoin/amount(max104)
space: O(104-amount).

  
  /**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  if(amount === 0) return 0
  const lowestCoinCountToAmount = fewestCoins(coins, amount)
  return lowestCoinCountToAmount === Infinity ? -1 : lowestCoinCountToAmount;
};

const fewestCoins = (coins, amount, count = 0) => {
  if(amount === 0)return count
  if(amount < 0) return Infinity
  let lowestCount = Infinity;
  for (const coin of coins){
      lowestCount = Math.min(fewestCoins(coins,amount-coin, count+1),lowestCount)
  }
  
  
  return lowestCount;
}



  /**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeMemo = function(coins, amount) {
  if(amount === 0) return 0
  const lowestCoinCountToAmount = fewestCoins(coins, amount)
  return lowestCoinCountToAmount === Infinity ? -1 : lowestCoinCountToAmount;
};

const fewestCoins = (coins, amount, fewestCoinsToAmount = new Map()) => {
  
  if(fewestCoinsToAmount.has(amount))return fewestCoinsToAmount.get(amount)
  if(amount === 0)return 0
  if(amount < 0) return Infinity
  let lowestCount = Infinity;
  for (const coin of coins){
      lowestCount = Math.min(1+fewestCoins(coins,amount-coin,fewestCoinsToAmount),lowestCount)
  }
  
  fewestCoinsToAmount.set(amount,lowestCount)
  return lowestCount;
}




  /**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeDP = function(coins, amount) {
  if(amount === 0) return 0
  const fewestCoinsCount = new Array(amount+1).fill(Infinity);
  fewestCoinsCount[0] = 0
  fewestCoins(fewestCoinsCount, coins, amount)
  return fewestCoinsCount[amount] === Infinity ? -1 : fewestCoinsCount[amount];
};

const fewestCoins = (fewestCoinsCount, coins,amount) => {

    for(let amountIndex = 1; amountIndex <= amount; amountIndex++){
        for(const coin of coins){
            if(coin < amountIndex){
                fewestCoinsCount[amountIndex] = Math.min(fewestCoinsCount[amountIndex], fewestCoinsCount[amountIndex-coin] + 1)
            }else if(coin === amountIndex){
                fewestCoinsCount[amountIndex] = 1;
            }
        }
    }
}









