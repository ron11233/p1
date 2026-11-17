Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.


input - string s 
output- palindrom partitions from substrings of s
rule: must be contigous sequence, and valid palindrom  


constraints 
1 <= s.length <= 16
s contains only lowercase English letters.


example 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]

"abap"
output ["aba", p] ,[a,b,a,p]


approahces: 
always can do 2 things- either cut - can only do if current combination is palindrom. or skip - just add to combination. if reached last index and currently have palindrom push to results

time: 2-cut or skip^n-charsnum*n-validatePalindrom
space: o(n-depth)


walkthrough: 
create palindromPartitions array - and return it
create fillPalindromPartitions(charIndex, substringStartIndex, substring, s,palindromPartitions) // void
in it - if current substring is palindrom - call fillPalindromPartitions with charindex + 1 and substring.push - slice from substringStartIndex to charIndex. and substringStartIndex= charIndex. then pop. 

and also do skip - just call fillPalindromPartitions with charIndex + 1

basecase - charIndex === s.length. check if currentSubstring is palindrom - if it does push to palindromPartitions. if not just return.

  
  /**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  const palindromPartitions = []; 

  fillPalindromPartitions(0, 0, [], s, palindromPartitions)
  return palindromPartitions;
};

const fillPalindromPartitions = (charIndex, substringStartIndex, substring, s,palindromPartitions) => {
      if(charIndex === s.length){
          if(substringStartIndex === charIndex){
             palindromPartitions.push([...substring]);
          }
        return;
      }

   const currentSubstring = s.slice(substringStartIndex,charIndex + 1);
   const isSubstringPalindrom = checkIsValidPalindrom(currentSubstring)
   if(isSubstringPalindrom){
     substring.push(currentSubstring);
     fillPalindromPartitions(charIndex + 1, charIndex + 1,substring, s, palindromPartitions)
     substring.pop();
     
   }

  fillPalindromPartitions(charIndex + 1,substringStartIndex ,substring, s, palindromPartitions)
    
}

const checkIsValidPalindrom = (str) => { // returns boolean
     let leftIndex = 0
     let rightIndex = str.length-1

    while(leftIndex < rightIndex){
        if(str[leftIndex] !== str[rightIndex]) return false
        leftIndex ++;
        rightIndex--;
    }
  return true;
}
