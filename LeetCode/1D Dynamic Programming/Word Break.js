Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.


input string s and dict of words wordDict
output: true if the string can be split into complete words in dict or false if cant 
rule: can add as many spaces to separate the string. all string words should match dict words. the opposite isn't true. dont have to use all dict words. can use same word twice 



constraints
s length. 
s lowercaseenglish? 
dict size range? dict key range? 

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.


example "meandyou", wordDict: "me","and","will","you" return true 

tricky "meandmed" word :"me", "and" return false - d is extra

edge "a", worddict: "d" return false

approaches: 
brute force - run the str building substr. 0index then 0+1 like that. everytime find matching word - send recursion to try find for rest of substr. if could finid finish. if not continue the previous str build. 

time:n^2. for each n i can try to find all other substrings which takes n too
space:o(n) to build dict for wordDict. depth also O(n)

better: i can also iterate from the dict to the str. loop with the dict string. everytime check if includes (also consider include many times). it wont work.. order we iterate with dict also metters. 
   
  



















  /**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const canBuildWordFromHere = new Array(s.length+1).fill(false);    
  canBuildWordFromHere[s.length] = true;
  const wordSet = new Set(wordDict);

  checkIfStringMatch(s, wordSet, canBuildWordFromHere)
  return canBuildWordFromHere[0]
};


const checkIfStringMatch = (s,wordSet,canBuildWordFromHere) => {

    for(let sIndex = s.length-1; sIndex>=0; sIndex--){
      if(!canBuildWordFromHere[sIndex+1])continue; // if cant cut the rest - continue we cant cut here. 
      let currentStr = s[sIndex];
      if(wordSet.has(currentStr) && canBuildWordFromHere[sIndex+1]){
          canBuildWordFromHere[sIndex] = true;
      }
      
      for(subStrIndex = sIndex - 1; subStrIndex >= 0; subStrIndex--){
          currentStr = s[subStrIndex] + currentStr
          if(wordSet.has(currentStr) && canBuildWordFromHere[sIndex+1]){
              canBuildWordFromHere[subStrIndex] = true 
            }
      }
    }
}

