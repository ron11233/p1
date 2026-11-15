Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size groupSize, and consists of groupSize consecutive cards.

Given an integer array hand where hand[i] is the value written on the ith card and an integer groupSize, return true if she can rearrange the cards, or false otherwise.


input hand int array of values of card, and groupSize int
output- true if can rearrange the cards into consecutive nums of group size false if can't



constraints 
hands length. can be smaller than groupsize? 

hands[i] range
groupsizerange

1 <= hand.length <= 104
0 <= hand[i] <= 109
1 <= groupSize <= hand.length

example: 
normal - 2,4,3,5,6,4 group size = 3 return true

tricky

edge 1 group size 1 return true



approaches: 
brute force: find curr minimum - build groupsize - cut all of chars used from string. do same till string empty. if can't empty return false can return true. 
time: groupsize.length*O(n) - find min, find groupsize consecutive, cut string. all of them separate o(n). space: o(cards.length/groupsize*n) times i create new string * size (max is n)

problem - iterating many times through same cards

better: sort first, then keep into groups. if have double number keep it was double. then next one must be double too 
nlogn + o(n)



runthrough

first sort the cards array.

then iterate it all. 
each card - dequeue add it to the dequeue and insert to queue. can have array and always make sure its also consecutive num (last num add). when dequeue check if we reached groupSize with new card. 















  /**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function(hand, groupSize) {
    if(hand.length===1)return true
    if(groupSize === 1) return true;
    if(hand.length%groupSize !== 0) return false;
  
    const sortedHands = [...hand].sort((a,b) => a-b);
    const consecutiveNums = new Queue();
  
    for(const currHand of hand){
        if(consecutiveNums.isEmpty()){
          consecutiveNums.enqueue([hand]);
          continue;
        }
      
        const consecutiveCards=  consecutiveNums.dequeue();
        if(currHand !== consecutiveCards[consecutiveCards.length-1] + 1) return false;
        if(consecutiveCards.length === groupSize-1)continue;
        consecutiveCards.push(currHand);
        consecutiveNums.enqueue(consecutiveCards);
    }

  return consecutiveNums.isEmpty();
};
