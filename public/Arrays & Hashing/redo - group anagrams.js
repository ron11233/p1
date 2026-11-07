Given an array of strings strs, group the anagrams together. You can return the answer in any order.

input array of strings
output - array which each cell has array of all of the matching anagrams
rule: anagram is 2 words that shares exactly same letters same amount different order. 


  contraints
strs[i] size, which chars?
strs length 
if 1 return str 
if 0 return str 


1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.


  example 
Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]



edge: [], ['aim'] - both should return array 


Approaches! 

Bruteforce - 
  for each n - for each char- go to all other n - char and map matching. so time: O(n^2*charMaxLength^2)
problem - goes through each str[i] many times. and each str[i][j]. 

Better: for each n - map char:numOfOcurrance then check if they matching through iterating the map. n^2 * c 
we still checking each str many times. 

Optimal sort each str - then add key value. key is sorted str value is array of all matching items. return they dict.values(). time: for each n - sort c (clogc). so n*clog(c). space: key-val which is n length


map - key(sorted str) : value [matchingAnagram];
iterate strs. for each str sort it - and push it to map
return map values


otpimal 2 
map - key(bucketCount as string with #) : value [matching anagrams]
iterate strs. for each str - have 26 size array with 0 fill. each char adds 1. when finish iterating all chars, join array to string with #, and this is the key. 
  return map values
  /**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const charCountStrToAnagrams = new Map();

  for(const str of strs){
      const charsCount = Array.from(length: 26, (i) => 0) // i practice usage of array.from
     for(char of str){
         const charCode = char.charCodeAt(0) - 'a'.charCodeAt(0);
         charsCount[charCode]++;
     }
      const charsCountString = charsCount.join("#")
      if(!charCountStrToAnagrams.has(charsCountString))charCountStrToAnagrams.set(charsCountString,[])
      charCountStrToAnagrams.get(charsCountString).push(str);
  }
  return [...charCountStrToAnagrams.values()]
};






  /**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagramsOptimalBucketCount = function(strs) {
  const charCountStrToAnagrams = new Map();

  for(const str of strs){
      const charsCount = Array.from({length: 26}, (i) => 0) // i practice usage of array.from
     for(const char of str){
         const charCode = char.charCodeAt(0) - 'a'.charCodeAt(0);
         charsCount[charCode]++;
     }
      const charsCountString = charsCount.join("#")
      if(!charCountStrToAnagrams.has(charsCountString))charCountStrToAnagrams.set(charsCountString,[])
      charCountStrToAnagrams.get(charsCountString).push(str);
  }
  return [...charCountStrToAnagrams.values()]
};
