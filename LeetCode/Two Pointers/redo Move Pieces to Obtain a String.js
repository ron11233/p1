You are given two strings start and target, both of length n. Each string consists only of the characters 'L', 'R', and '_' where:

The characters 'L' and 'R' represent pieces, where a piece 'L' can move to the left only if there is a blank space directly to its left, and a piece 'R' can move to the right only if there is a blank space directly to its right.
The character '_' represents a blank space that can be occupied by any of the 'L' or 'R' pieces.
Return true if it is possible to obtain the string target by moving the pieces of the string start any number of times. Otherwise, return false.



input 2 strings, start and target
output boolean 
rule: if can reach target from string - by moving 'L' / & 'R' any num of times. can move L to left only if there is _ to its left. same goes for R and its right

constraints 
start, target length


n == start.length == target.length
1 <= n <= 10^5
start and target consist of the characters 'L', 'R', and '_'.



examples
normal    R_L__L_R_
          RL_L____R output T 


tricky    R_____L LR_____ op- F 
edge  R    R output T

approaches:
brute force- go with for loop. each char matching on string and char. if match continue. 
if not match - L:  if  in target before normal - go in normal in while look for L. if found R on the way return false. if found only space then L, switch L and space and continue.
                  if in normal before target - return false

              R: if found in target before normal- return false. 
                  if found in normal before - iterate next till find R in target. if find L in target return false. also if found L in normal return false.

time: O(n)
space: O(1)


walkthrough: 
create charIndex
iterate start.length
for each char- if start[char] === target[char] continue
else if L in start - return false
else if R in target - return false
else if L in target - make while loop to find next letter in start. if found L replace and continue. if found R / end string - ret false
else if R in start - make while loop - if found only spaces in normal and R in target - continue. if found anything different than that - ret false




  /**
 * @param {string} start
 * @param {string} target
 * @return {boolean}
 */
var canChange = function(start, target) {
    for(let charIndex = 0; charIndex < start.length; charIndex++){
        const startChar = start[charIndex]
        const targetChar = target[charIndex];

        if(startChar === targetChar){ //match
            continue;
        }else if(startChar === 'L' || targetChar === 'R'){ // cant move L right or R left
            return false
        }else if(targetChar === 'L'){
            const nextCharIndex = searchNextChar(start,charIndex, 'L') // -1 if can't 
            if(nextCharIndex === -1) return false
            [start[charIndex], start[nextCharIndex]] =[start[nextCharIndex],start[charIndex]]
        }else if(startChar === 'R'){
            let nextRIndex = charIndex + 1;
            while(nextRIndex  < start.length){
                if(startChar[nextRIndex] !== '_') return false
                else if(target[nextRIndex] === 'R'){
                    
                }else if(target[nextRIndex] === 'L') return false
            }
        }
    }
};



start R_L__L_R_
target RL_L____R output T 

  /**
 * @param {string} start
 * @param {string} target
 * @return {boolean}
 */
var canChange = function(start, target) {
    let startIndex = findNextPiece(start,0);
    let targetIndex = findNextPiece(target,0);

    while(startIndex < start.length && targetIndex < target.length){
  
      const startPiece = start[startIndex];
      const targetPiece = target[targetIndex];
  
      if(startPiece === 'L'){
          if(startIndex < targetIndex || targetPiece !== 'L'){ // cant move L forward / target piece don't match
            return false
          }
      }else if(startPiece === 'R') {
          if(targetPiece !== 'R' || startIndex > targetIndex){ // cant move R backwards
              return false
          }
      }
      startIndex = findNextPiece(start,startIndex+1);
      targetIndex = findNextPiece(target,targetIndex+1);
    }
  
    return startIndex === start.length && targetIndex === target.length // true only if both reached the end  
};




const findNextPiece = (str,strIndex)  => {
    while(strIndex < str.length){
        if(str[strIndex] === 'R' || str[strIndex] === 'L'){
            return strIndex;
        }
        strIndex++;
    }

  return strIndex;
}

time: O(n)
space O(1)



