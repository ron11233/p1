Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.


input 2 strings 
output int length of longest common subsequence, 0 if no common
rule: can make subsequence from chars in both strings- in same relative order 




constraints 
chars range 
str.length 

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.

example   
normal - "apacmm", "alpcxx" return 3 APC

tricky- "apamcds", "pelza" ret 1 
   
edge- "a", "c" ret 0 

approaches:
brute force: 
check all combinations- each step check - if chars match cut both and add 1. if not - try both cut only text1 or only text2, and return max of both. 
basecase- any of the texts reached his length 

time: 2-cut txt1 or txt2 ^max(text1.length, text2.length)
space: max(text1.length, text2.length)- max 1000

problem: checking same problem many times

better: add memo - key - text1Index, text2Index |  value - longestSubsequence

text1.length = n 
text2.length = m

time: m*n states
space: m*n states + max(m,n) depth

optimized 2D 
m*n . fill table 0 

longestSubsequence- longest sebsequence length 
me: longestSubsequence[text1Index+1][text2Index+1] - max before cutting, if current chars max add 1 to current cell. 
basecase: any index < 0

time: m*n 
space: m*n

walkthrough: 
create longestSubsequence 2D array m*n fill with 0
iterate through m from end to 0 
iterate through n from end to 0

each iteration - current cell = cell[currentM+1][currentN+1] + isCurrentCharMatch

return longestSubsequence[0][0]


  /**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const firstTextLength = text1.length; 
    const secondTextLength = text2.length; 
  
    const longestSubsequence = Array.from({length: firstTextLength + 1}, () => new Array(secondTextLength + 1).fill(0))

    for(let firstTextIndex = firstTextLength - 1; firstTextLength >= 0; firstTextIndex--){
        const firstTextChar = text1[firstTextIndex];
        for(let secondTextIndex = secondTextLength - 1; secondTextLength >=0; secondTextIndex--){
            const secondTextChar = text2[secondTextIndex];
            longestSubsequence[firstTextIndex][secondTextIndex] = longestSubsequence[firstTextIndex + 1][secondTextIndex + 1];
            if(firstTextChar === secondTextChar){
              longestSubsequence[firstTextIndex][secondTextIndex]++;
            }
        }
    }
  return longestSubsequence[0][0]
};

