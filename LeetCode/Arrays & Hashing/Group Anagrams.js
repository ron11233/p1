
https://leetcode.com/problems/group-anagrams/description/?envType=company&envId=google&favoriteSlug=google-three-months

Given an array of strings strs, group the anagrams together. You can return the answer in any order.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -  strs.length? given
   -  all chars? only lowerCase? given
   - if empty just return empty str arr? 
   - 1 just return it? 
   - can same word twice? 
     

   GIVEN:
  1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.


3. EXAMPLES
   normal:Input: strs = ["eat","tea","tan","ate","nat","bat"] - took from q because hard to think



   tricky: ["eat", "mom"]
   edge: [] 


4. APPROACHES
   1. Naive: for each word, open an array and iterate through each char all other str if in go next char if have all char add to stack and to seen. iterate like this for every word. so for every word (n) iterate all chars of word (c) and all other words chars n c   Time O(c^2*n^2)  Space O(n*c -results array))

   2. Better:can save all chars of each word in Dict and find in O1 each char   Time O(N^2*c)  Space O(n*c)
   3. Optimal: sorting then putting in Map. then iterate map results Time O(n *ClogC)  Space O(N*C)
   → implementing #3 because optimal time and space 


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const result = [];
    const sortedToAnagram = new Map(); 

    for(const str of strs){
        const sortedStr = [...str].sort().join("");
        if(!sortedToAnagram.has(sortedStr)) sortedToAnagram.set(sortedStr, []);
        sortedToAnagram.get(sortedStr).push(str);
    }

  for(const [sortedAnagram, originalWords] of sortedToAnagram){
      result.push(originalWords);
  }

  return result;
};


var groupAnagramsOptimized = function(strs) {
/**
 * @param {string[]} strs
 * @return {string[][]}
 */

      const keyToAnagram = new Map();

    for(const str of strs){
        
        const array = new Array(26).fill(0)
        for(const char of str){
          const charCode = char.charCodeAt(0) - 97;
          array[charCode]++;
        }
        let key = array.join("#") 
        
        if(!keyToAnagram.has(key)) keyToAnagram.set(key, [])
        keyToAnagram.get(key).push(str)
    }

  return [...keyToAnagram.values()]

}  


7. VERIFICATION
