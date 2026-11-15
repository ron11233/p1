Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character


input 2 strs word1,word2. 
output- int num - minimum operations from word1 to word2
rule: operations are insert delete and replace. 

constraints: 
word1,2.length? 
chars of word 1 chars of word2 


0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.

if 1 of them is empty - just add/remove the amount of the other ones length. 

example:
normal-      "abc" -> "acbd" - 2 : replace bc and add d 

tricky: "acbc" -> "ccb" - replace bc add a 

edge- "" -> "abc" -- 3. "" -> "" : 0 


approaches:
brute force - 
countMinimumOperations(word1Index,word2Index,word1,word2) - return minimum int operations from word1Index, word2Index to match. 
me: if match- go +1 on both indexes. if not - try add, remove, and replace. add would make word2 index +1 and operation +1. remove will make both + 1 and operations +1. replace would make both +1 operations +1. 

  
basecase: word1Index === word1.length && word2Index === word2.length;

time:  3^word1.length
space: word1.length

problem: calc same situtation many times

better: use memo. sourceIndex, targetIndex: minOperations
time: n-sourceLength*m-targetLength
space: n*m




optimized: DP
time: n*m
space: n*m

minOperations[sourceIndex, targetIndex] - num of operations to match word1 to word2 from sourceIndex,targetIndex.
start: minOperations[source.length, target.length] = 0
me: check current targetChar. if equal sourceChar - minOperations[sourceIndex, targetIndex] = minOperations[sourceIndex+1, targetIndex+1].
  else try all operations. 

base case:reached sourceIndex is 0 and targetIndex is 0 return it. 





/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance2DP = function(word1, word2) {
    const minOperations = Array.from({length: word1.length + 1}, () => Array.from({length:word2.length + 1}))
    insertMinOperations(word1,word2,minOperations)
    return minOperations[0][0]
};

const insertMinOperations = (word1,word2,minOperations) => {
      for(let sourceIndex = word1.length; sourceIndex >= 0; sourceIndex--){
          for(let targetIndex = word2.length; targetIndex >= 0; targetIndex--){
              if(sourceIndex === word1.length){
                minOperations[sourceIndex][targetIndex] = word2.length-targetIndex;
                continue;
              }
              if(targetIndex === word2.length){
                minOperations[sourceIndex][targetIndex] = word1.length-sourceIndex;
                continue;
              }
            
              const sourceChar = word1[sourceIndex];
              const targetChar = word2[targetIndex];
              if(targetChar === sourceChar){
                minOperations[sourceIndex][targetIndex] = minOperations[sourceIndex + 1][targetIndex + 1];
              }else{
                  const add = minOperations[sourceIndex][targetIndex + 1]
                  const remove = minOperations[sourceIndex + 1][targetIndex]
                  const replace = minOperations[sourceIndex + 1][targetIndex + 1]
                  minOperations[sourceIndex][targetIndex] = 1 + Math.min(add,remove,replace);
              }
          }
      }
    
    
}







/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
     return countMinimumOperations(0,0,word1,word2);
};

const countMinimumOperations = (word1Index,word2Index,word1,word2) => { // returns int min operations
    if(word1Index === word1.length && word2Index === word2.length) return 0;
    if(word1Index === word1.length) return word2.length-word2Index;
    if(word2Index === word2.length) return word1.length-word1Index;
  
    if(word1[word1Index] === word2[word2Index]) return countMinimumOperations(word1Index+1, word2Index+1,word1,word2);
    let minimumOperations = Infinity;

    minimumOperations = Math.min(minimumOperations, 1 + countMinimumOperations(word1Index, word2Index+1,word1,word2)) // add
    minimumOperations = Math.min(minimumOperations, 1 + countMinimumOperations(word1Index+1, word2Index+1,word1,word2)) //replace
      minimumOperations = Math.min(minimumOperations, 1 + countMinimumOperations(word1Index+1, word2Index,word1,word2)) //remove
    return minimumOperations;
}



/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistanceWithMemo = function(word1, word2) {
    const indexesToMinOperations = new Map()
    return countMinimumOperations(0,0,word1,word2,indexesToMinOperations);
};

const countMinimumOperations = (word1Index,word2Index,word1,word2,indexesToMinOperations) => { // returns int min operations
    if(word1Index === word1.length && word2Index === word2.length) return 0;
    if(word1Index === word1.length) return word2.length-word2Index;
    if(word2Index === word2.length) return word1.length-word1Index;
    const key = `${word1Index},${word2Index}`;
    if(indexesToMinOperations.has(key)) return indexesToMinOperations.get(key);
    if(word1[word1Index] === word2[word2Index]) return countMinimumOperations(word1Index+1, word2Index+1,word1,word2,indexesToMinOperations);
    let minimumOperations = Infinity;

    minimumOperations = Math.min(minimumOperations, 1 + countMinimumOperations(word1Index, word2Index+1,word1,word2,indexesToMinOperations)) // add
    minimumOperations = Math.min(minimumOperations, 1 + countMinimumOperations(word1Index+1, word2Index+1,word1,word2,indexesToMinOperations)) //replace
    minimumOperations = Math.min(minimumOperations, 1 + countMinimumOperations(word1Index+1, word2Index,word1,word2,indexesToMinOperations)) //remove

    indexesToMinOperations.set(key,minimumOperations)
    return minimumOperations;
}


