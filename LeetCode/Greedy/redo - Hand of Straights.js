Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.


input - int array hand, int group size
output - boolean 
rule: if can make split hand array to groupsize size of groups, where each group contains consecutive cards 

constraints 
hand length
hand[i] range
groupsize range. can groupsize be1? hand.length < groupsize? 

  1 <= hand.length <= 10^4
0 <= hand[i] <= 10^9
1 <= groupSize <= hand.length


examples
3,5,7,4,5,6,8,4 g = 2 return true
tricky 1,1,1,2,2,3,3,3 group = 3  ret- false
edge 1 g= 1 ret true 



approaches 
brute force: each iteration - first find min value. when u find min value iterate with a while loop till find groupsize consecutives, adding them to a set to avoid repetition. if in while loop couldnt find group size group return false. 
  
time: find minimum is O(n) * while loop is groupsize * n = n^2 * groupSize
space: O(n) for the set 

problem: we iterating each n many times 

better: clearly we need minimums. we can either add to minHeap / sort the array. sort seems better. sort the array first, then add all to dictionary for quick lookup and -- on count every seen. 
have a for loop iterate all sortednums. inside have a while loop finding groupSize for current num. if num already is 0 on seen means he used can continue

time: O(n) + nlogn = o(nlogn) - for does run n and inside while loop group size, but then we skip all values we saw on while so it ends up visiting n. the sort is n log n.
space: O(u) - unique numbers in hand











  /**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
    const sortedHand = [...hand].sort((a,b) => a-b);
    const handOccurances = mapHandsOccurances(sortedHand);

    for(let handIndex = 0; handIndex < sortedHand.length; handIndex++){
        const currentHand = sortedHand[handIndex]; 
        if(handOccurances.get(currentHand) === 0) continue; 

        const didApplyGroup = applyGroupForHand(currentHand, handOccurances,groupSize);
        if(!didApplyGroup) return false;
    }
  return true;
};

const applyGroupForHand = (currentHand, handOccurances, groupSize) => { // return void. make group for hand by decreasing occurances. if cant find group returns false. else true 
    let currentGroupSize = 1; // already start with first hand
    let consecutiveHand = currentHand + 1; 
    while(groupSize > currentGroupSize){
        const consecutiveHandOccurances = handOccurances.get(consecutiveHand)
        if(consecutiveHandOccurances === 0) return false; 
        handOccurances.set(consecutiveHand, consecutiveHandOccurances - 1);
        currentGroupSize++;
        consecutiveHand++;
    }
  return true; 
}

const mapHandsOccurances = (sortedHand) => {
    const handOccurances = new Map(); 

    for(let handIndex = 0; handIndex < sortedHand.length; handIndex++){
        const currentHand = sortedHand[handIndex];
        if(!handOccurances.has(currentHand)) handOccurances.set(currentHand, 0);
        handOccurances.set(currentHand, handOccurances.get(currentHand) + 1);
    }
    return handOccurances
}


