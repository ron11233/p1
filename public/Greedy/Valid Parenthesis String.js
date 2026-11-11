Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

input string s consists of "(" ")" "*"
output- true if valid false otherwise
rule: must be valid parenthesis rules + * can fill as both parenthesis or nothing. JOKER! 


constraints
s.length max min 

1 <= s.length <= 100
s[i] is '(', ')' or '*'.

example *)()*(*)) true

  tricky

  edge - ( false | * true

approaches: 
bruteforce-  have normal stack technic to valid parenthesis. every time have Joker - try all 3 options till 1 valid. first is ( second ) third is skip. this is---- BACKTRACKING! 
time: O(3- 3 options ( ) skip - ^n depth)
space o(n - depth of recursion). 
problem - many times iteration through same values

better: keep jokerCount. everytime i fail to valid (there is closing parenthesis and stack is empty) jokercount -- (used as open parenthesis). if ) and no stack and no joker return false
if finished all return true! 
time O(n)
space O(1)




/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function(s) {
    let wildCard = 0;
    const stack = [];

    for(const char of s){
        if(char === "*")stack.push();
        if(char === "(")stack.push(char);
        if(char === ")"){
          if(stack.length !== 0){
             stack.pop();
          }else if(wildCard > 0){
              wildCard--;
          }else{
            return false;
          }
        }
    }

  
    
  return stack.length === 0
};
                                                                                      
