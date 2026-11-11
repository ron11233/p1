You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.


input - string s
output- array of ints represents the slicing of the string 
rule: we need to cut the string as many time as possible, while keeping any char only in 1 substr. 


constraints
s letters? s.length

1 <= s.length <= 500
s consists of lowercase English letters.



examples
normal: "abaccde" result - [aba, cc,d,e] so res is [3,2,1,1]

ticky:"aabbdd" res [2,2,2]
edge "ddddd" res [5]


approaches:
brute force: 
iterate all chars. for each char - check if our current slice chars exist in all other substring we didnt go through. if there is we keep increasing our current chunk until no char we have is on the other substr then we push first cut. keep like that till we finish. 
time: n^2 - for each n we look all prev n and next n
space: O(1)
problem - every iteration we go through all array. 

first of all we can add to map all values - char:count. then we know when to stop. its On actually! O(n) time and O(n) space


walkthrough: 
we iterate the array- 
  for each char - if its occurance is 1 we cut. if not - we add it to an array of occured. until this array is empty we continue. if we reached last occurance we remove from array. actually make it dict so we have O(1) delete and lookup. 
  









  /**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    const charToOcurrance = createCharToOccurancesMap(s)
    const smallestValidPartitions = partitionString(s,charToOcurrance)
    return smallestValidPartitions;
    
};

const createCharToOccurancesMap = (str) => {
    const charToOcurrance = new Map();

    for(const char of str){
        charToOcurrance.set(char, (charToOcurrance.get(char) || 0) + 1)
    }
    return charToOcurrance;
}

const partitionString = (str, charToOccurance) => {
    const validPartitions = [];
    let partitionLeftoverChars = new Set();
    let startPartitionIndex = 0;

    for(let charIndex = 0; charIndex < str.length; charIndex++){
        const currentChar = str[charIndex];
        charToOccurance.set(currentChar, charToOccurance.get(currentChar)-1);
        const currentCharOccurances= charToOccurance.get(currentChar)
      
        if(currentCharOccurances === 0){
            partitionLeftoverChars.delete(currentChar);
        }else{
          partitionLeftoverChars.add(currentChar);
        }
      if(partitionLeftoverChars.size === 0){
          validPartitions.push(charIndex-startPartitionIndex + 1);
          startPartitionIndex = charIndex + 1;
      }
    }
    return validPartitions;
}

