Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.



input - 2 strings 
output- int length of the longest common substring
rule: to create substring can delete any letter of the string - but keep in same order of original. 

constaints 
text1 text2 length
what are the chars possible


1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.

example str 1 abgdxudm str 2 axduxvm res- adxm 4 


tricky: 
edge : str 1 d start 2 m res - 0



approaches:
brute force- 
  run through first str. for each char - keep or skip. and for each keep or skip - need to keep or skip for second string all chars. 
  time: 2-keep or skip^str1.length-num of chars * 2^str2.length. 
  space: str1.length * str2.length

problem - calculating each possible combination


promise: longestCommonSubstring - returns num of longest common substring
me: either move str1 + 1 and str2+1. return the max of both. if current str1 and str2 chars are equal - add 1 to answer and put both str1+1 and str2+1. 
basecase: pointer of str1 or str 2 is 0. return 0. 






better:  







  /**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const longestSubsequenceMemo = new Map();
    return longestSubsequence(0,0,text1,text2,longestSubsequenceMemo);
};

const longestSubsequence = (firstTextIndex, secondTextIndex, text1, text2,longestSubsequenceMemo) => {
    if(firstTextIndex === text1.length || secondTextIndex === text2.length) return 0;
    if(longestSubsequenceMemo.has(`${firstTextIndex},${secondTextIndex}`)) return longestSubsequenceMemo.get(`${firstTextIndex},${secondTextIndex}`)
    const firstTextChar = text1[firstTextIndex]
    const secondTextChar = text2[secondTextIndex]
  
    if(firstTextChar === secondTextChar){
      const currentLongestSubsequence = longestSubsequence(firstTextIndex + 1, secondTextIndex+1, text1, text2,longestSubsequenceMemo) + 1;
      longestSubsequenceMemo.set(`${firstTextIndex},${secondTextIndex}`, currentLongestSubsequence);
      return currentLongestSubsequence 
    }else{
      const currentLongestSubsequence  = Math.max(longestSubsequence(firstTextIndex + 1, secondTextIndex, text1, text2,longestSubsequenceMemo), longestSubsequence(firstTextIndex, secondTextIndex+1, text1, text2,longestSubsequenceMemo)) 
      longestSubsequenceMemo.set(`${firstTextIndex},${secondTextIndex}`, currentLongestSubsequence);
      return currentLongestSubsequence 
    }
}






