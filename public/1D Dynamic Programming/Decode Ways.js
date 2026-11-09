You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

"1" -> 'A'

"2" -> 'B'

...

"25" -> 'Y'

"26" -> 'Z'

However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs "25").

For example, "11106" can be decoded into:

"AAJF" with the grouping (1, 1, 10, 6)
"KJF" with the grouping (11, 10, 6)
The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
Note: there may be strings that are impossible to decode.

Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.

The test cases are generated so that the answer fits in a 32-bit integer.



input string s contains digits
output - number of ways to decode the digits in the string 
rule: each number have decode- 1-26. they can have few ways beacuse 24 can either be 2,4 or 24. so any num starts with 1 or 2 may be able to be split if following num is 0-6 inclusive. 

constraints 
what chars s contains. only nums 0-9?
s.length range

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).


  example 211   2,1,1 - 21,1 - 2,11

tricky 2006

edge 0006


approaches: 
bruteforce 
each time need to choose if i take 1 num or 2 as the translation. 
take 2 - and count ways to 11. then go again.
  each time index +1 or index + 2 as start. 

 promise: returns numOfDecoding. if cant return 0.
 me: take 1 char + numOfDecoding(charIndex+1) + take 2 char + numofdecoing(charIndex+2).
 child need from me startIndex
 base case: startIndex = s.length - return 1;
time: 2^n
space: o(n) depth of recursion

problem - calc each combination many time
can go with dp
dp[i] = max combinations sofar 
combine- if not 0 - check if can take currnum and previndexnum - if valid: add dp[i-2]. anyways if not 0 add dp[i-1]. if 0 keep 0. 
basecase- dp[0] = if not 0 then 1 if 0 then 0. dp[1] = if can combine prevnum and me so 1 + dp[0] else 1.

time: o(n)
space: o(n)

ican do optimized and keep only dp[i-1] dp[i-2] and max. make space O1
  
  /**
 * @param {string} s
 * @return {number}
 */
var numDecodingsBruteForce = function(s) {

  const maxDecoding = getMaxDecoding(0,s);
  return maxDecoding;
};

const getMaxDecoding = (charIndex, s) => {
    if(Number(s[charIndex]) === 0) return 0
    if(charIndex === s.length) return 1

    const canDecodeTwoChars = charIndex !== s.length-1 && Number(s.slice(charIndex, charIndex+2) <= 26 && 0 < Number(s.slice(charIndex, charIndex+2)));
    const decodeByOneChar = Number(s[charIndex]) !== 0 ? getMaxDecoding(charIndex+1,s) : 0
    const decodeByTwoChars = canDecodeTwoChars ? getMaxDecoding(charIndex+2,s) : 0

    return decodeByOneChar + decodeByTwoChars
}





  /**
 * @param {string} s
 * @return {number}
 */
var numDecodingsWithMemo = function(s) {

  const numDecodingsOfIndex = new Map();
  const maxDecoding = getMaxDecoding(0,s,numDecodingsOfIndex);
  return maxDecoding;
};

const getMaxDecoding = (charIndex, s,numDecodingsOfIndex) => {
    if(numDecodingsOfIndex.has(charIndex))return numDecodingsOfIndex.get(charIndex);
    if(charIndex === s.length) return 1
    if(Number(s[charIndex]) === 0) return 0

    const canDecodeTwoChars = charIndex !== s.length-1 && Number(s.slice(charIndex, charIndex+2) <= 26 && 0 < Number(s.slice(charIndex, charIndex+2)));
    const decodeByOneChar = Number(s[charIndex]) !== 0 ? getMaxDecoding(charIndex+1,s,numDecodingsOfIndex) : 0
    const decodeByTwoChars = canDecodeTwoChars ? getMaxDecoding(charIndex+2,s,numDecodingsOfIndex) : 0

    numDecodingsOfIndex.set(charIndex, decodeByOneChar + decodeByTwoChars)
    return decodeByOneChar + decodeByTwoChars
}




problem - calc each combination many time
can go with dp
dp[i] = max combinations sofar 
combine- if not 0 - check if can take currnum and previndexnum - if valid: add dp[i-2]. anyways if not 0 add dp[i-1]. if 0 keep 0. 
basecase- dp[0] = if not 0 then 1 if 0 then 0. dp[1] = if can combine prevnum and me so 1 + dp[0] else 1.

time: o(n)
space: o(n)

ican do optimized and keep only dp[i-1] dp[i-2] and max. make space O1




  /**
 * @param {string} s
 * @return {number}
 */
var numDecodingsWithDP = function(s) {

  const decodeCountFromIndex = new Array(s.length).fill(0);
  if(s[s.length-1] !== 0){
    decodeCountFromIndex[s.length-1] = 1
  }
  
  getMaxDecoding(s.length-1,s,decodeCountFromIndex);
  return decodeCountFromIndex[0];
};

const getMaxDecoding = (charIndex, s,numDecodingsOfIndex) => {
    
    if(charIndex < 0) continue;
    charAsNum = Number(s[charIndex])
    if(charAsNum === 0) {
      numDecodingsOfIndex[charIndex] = 0
      continue;
    }

    const canTakeTwoNum = charIndex !== s.length-1 && Number(s.slice(charIndex, charIndex+1)) <= 26;
    
  
    numDecodingsOfIndex[charIndex] += numDecodingsOfIndex[charIndex+1];
    if(canTakeTwoNum) numDecodingsOfIndex[charIndex] += numDecodingsOfIndex[charIndex+2];
}


