Given a string s, return the longest palindromic substring in s.

input - string s
output - longest palindrom substring
rule: needs to be contigeous 

constraints
can s be empty? length 1 ?
chars are lowercase or any? 

  1 <= s.length <= 1000
s consist of only digits and English letters.

  if have few with same max length, return any? 
  lowercase and upprcase not match right? 
  

  example
ddabaep - aba

tricky: Aa - a

edge: a



approaches: 
bruteforce: 
iterate all chars. for each char - try to build palindrom with left and right indicies. so for each char can visit all other chars worst case. n^2 time o1 space
problem - we iterate every char many times


better: 




walkthorugh
for each char - have an helper function that checks length if he is start of palindrom. returns the length of the longest palindrom when he starts.
for finding palindrom - left and right pointers. left = start-1 right = start+1 and every iteration left-- right++. if start = start + 1 - left - start-1 right - start +2. run in while to check bounds.
keep track of valid palindrom 












  

  /**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let longestPalindrom = ""
    for(let charIndex = 0; charIndex < s.length;  charIndex++){
      
        const currentPalindrom = explorePalindrom(charIndex,s);//returns string, validpalindrom // treat only 1 s.length
        longestPalindrom = currentPalindrom.length > longestPalindrom ? currentPalindrom : longestPalindrom
    }
  
  return longestPalindrom;
};

const explorePalindrom = (charIndex, s) => {
    let currentPalindrom = s[charIndex];
    if(s.length === charIndex + 1) return currentPalindrom;
    let left = s[charIndex] === s[charIndex+1] ? charIndex : charIndex - 1
    let right = charIndex + 1 
    
  
    while(left >= 0 && right <= s.length-1){
          if(s[left] === s[right]){
            currentPalindrom = s.slice(left,right)
            left--;
            right++;
          }else{
            return currentPalindrom 
          }
    }
  

  return currentPalindrom;
}


