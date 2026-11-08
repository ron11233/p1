Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.



  input- str includes digits from 2-9 
  output- all letter combinations that this number could represent
  rule - each number can have 3/4 letters. we should return every  combination exists. 

  constraints: 
  only digits[i] 2-9 ? 
  digits.length range? 

  1 <= digits.length <= 4
  digits[i] is a digit in the range ['2', '9'].

  example: "34" - [["dg"], ["dh"], ["di"], ... ]

  approaches: 

  for each number - get all combinations without him

    










  /**
 * @param {string} digits
 * @return {string[]}
 */

const phoneBoard = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
};

var letterCombinations = function(digits) {
  if(digits.length === 0) return [];
  const allCombinations = [];

  getCombination(0,[],digits, allCombinations)
  return allCombinations;
    
};


const getCombination =(level,path,digits,allCombinations) => {

    if(level === digits.length){
        allCombinations.push(path.join(""));
        return;
    }
    const currLevelLetters = phoneBoard[digits[level]]
    for(let letterIndex = 0; letterIndex < currLevelLetters.length; letterIndex++){
        path.push(currLevelLetters[letterIndex]);
        getCombination(level+1, path,digits,allCombinations);
        path.pop();
    }
}


