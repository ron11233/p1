A triplet is an array of three integers. You are given a 2D integer array triplets, where triplets[i] = [ai, bi, ci] describes the ith triplet. You are also given an integer array target = [x, y, z] that describes the triplet you want to obtain.

To obtain target, you may apply the following operation on triplets any number of times (possibly zero):

Choose two indices (0-indexed) i and j (i != j) and update triplets[j] to become [max(ai, aj), max(bi, bj), max(ci, cj)].
For example, if triplets[i] = [2, 5, 3] and triplets[j] = [1, 7, 5], triplets[j] will be updated to [max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5].
Return true if it is possible to obtain the target triplet [x, y, z] as an element of triplets, or false otherwise.


input - array of triplets. each triplet is [ai, bi,ci] 3 ints. and a target triplet
output- if we can make 1 triplet of our array of triplets match the target triplet.
rule: can take any 2 triplets and take max of each matching index- and it'll change the furthur index (j) triplet to the new one.

constraints
triplets length. triplets[i][x] val range

1 <= triplets.length <= 10^5
triplets[i].length == target.length == 3
1 <= ai, bi, ci, x, y, z <= 1000



example 
Input: triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]
Output: true

Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]
Output: true


approaches:
brute force: 
backtracking - for each step - try either combine with every possible other triplet - or skip. same for each next one - until the number have been combined with every other number. its !triplets.length^2 
time and triplets.length depth.


better: iterate 3 times (each time 1 tripletIndex).
  first iteration first triplet index[i][0]. go through all triplets. if i find my number - i check if any other number in triplet is bigger than target. if not instantly merge and continue next. same for second same for third


walkthrough
for each triplet go all 3. if any higher than matching continue. if all not height and atleast 1 matching keep it look for the other two same way. if  all 3 found true else false
















  /**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
var mergeTriplets = function(triplets, target) {
    const didFindTripletNum = new Array(3).fill(false);

    for(const triplet of triplets){
        let isOneNumHigher = false;
        for(let tripletCellIndex = 0; tripletCellIndex < 3; tripletCellIndex ++){
            if(triplet[tripletCellIndex] > target[tripletCellIndex]) isOneNumHigher=true
        }
        if(isOneNumHigher) continue

          for(let tripletCellIndex = 0; tripletCellIndex < 3; tripletCellIndex ++){
            if(triplet[tripletCellIndex] === target[tripletCellIndex]) didFindTripletNum[tripletCellIndex] = true;
          }
    }

    for(const didFindNum of didFindTripletNum){
        if(!didFindNum) return false;
    }
    return true;
};

time: O(n)
space: O(1)


