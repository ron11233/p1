Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.


input - string s 
output- number of palindromic substrings inside the string
rule: for each char- he is its own substring - and also try expend even and ueven from there. each succesful expansion is a new substring


constraints 
s.length size
s[i] only english lowercase? what letters? 


1 <= s.length <= 1000
s consists of lowercase English letters.



example - cba - 3 b c a 
          xaaa- a x a a aa aa aaa 7 




edge   d


approaches: 
bruteforce: for each num - go through every substring it has and check if its palindrom. every substring is another n and check palindrom is another n so n^3. space o1

better: same approach as before - but now we counting each palindrom instead of keeping only the longest. O(n^2) time and O(1) space 





walkthrough

main func run on all chars. for each char - send 2 calls for helper. one with left as curr and one left as curr-1 (even and uneven). right is curr+1 always. 
  helper function countPalindroms - will count and return the subpalindroms from that index given. 
  it will add first one if euqal and run through while as long inbound of s - every time expand right-- left++ and add to count. 











  /**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    //make sure to treat s.length = 1 
    let totalPalindromsCount = 0;
    for(let charIndex = 0; charIndex < s.length; charIndex++){
        const unevenPalindromsCount = countPalindroms(charIndex, charIndex,s);
        const evenPalindromsCount = countPalindroms(charIndex, charIndex+1,s);
        totalPalindromsCount += unevenPalindromsCount + evenPalindromsCount
    }
  return totalPalindromsCount;
};

const countPalindroms = (leftIndex,rightIndex, str) => {
    let palindromsCount = 0 

    while(leftIndex >= 0 && rightIndex <= str.length){
        if(str[leftIndex] === str[rightIndex]){
            palindromsCount++;
            leftIndex--;
            rightIndex++;
        }else{
     return palindromsCount;      
        }
    }
  return palindromsCount;
}

