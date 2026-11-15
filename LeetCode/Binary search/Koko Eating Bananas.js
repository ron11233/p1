<LeetCode link>

Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.




1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  what if h > piles[i]? h range piles[i] range? what return for cant
   -

   GIVEN:
1 <= piles.length <= 104
piles.length <= h <= 109
1 <= piles[i] <= 109


3. EXAMPLES
   normal:      100, 30 , 20 ,10     h=4 160 / 4 = 40 (minimum) left = 40 right = 100
   tricky:
   edge:


4. APPROACHES
   1. Naive: run from k=1, try to eat all in h time. if finished return k if not k++. k max is 109 since piles[i] max is 109.keep track of currentPile index and outer for will be for h   Time O(109(k)max * h)  Space O(1)

everytime we try from the beginning calculating. 


   2. Better:   find max piles[i] then binary search from 1 to max. if sucess go left canot go right  Time O(log(n)*h + n - so n disapear beacuse have log(n))  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    let sumPiles = 0;
    let maxPile = 0;

    for(const pile of piles){  
        sumPiles +=pile
        maxPile = Math.max(maxPile, pile)
    }

  let leftK = sumPiles / h
  let rightK = maxPile
  let midK; 
  
  while(leftK<rightK){
      let currentPileIndex = 0;
      midK = Math.floor((leftK + rightK) / 2);
    
      let hours = 0;

      for(const pile of piles){
          hours+= Math.ceil(pile/midK)
      }


        if(hours <= h){
              rightK = midK
        }else{
            leftK= midK+1
        }
      }
      return leftK
  }


7. VERIFICATION
