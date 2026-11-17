Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.


input- int n num of pairs of parenthesis
output- all combinations of well formed parenthesis 
rule: must be well formed

constraints
n length

1 <= n <= 8






examples
Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]

approaches:
brute force- 
have close counter open counter - every time try open and then close. in the end when used all (both counters = n) have a for loop using stack to validate. if validate push.

time: 2^n * n
space:n

problem: calculating paths that are invalid 

better: only if my openCount is higher than close counter i can try both open and close. otherwise only open. 
time: O(2^n * n)
space: O(n)



walkthrough
create validCombinations array for result - return it
create fillValidCombinations(openCounter,closeCounter, combination, n,validCombinations) //returns void
in the function - if openCounter != n call fillValidCombinations with openCounter+1 and pushed to combination '(', then pop.
if openCounter > close counter also do same with close. 
base case - openCounter && closeCount = n

  
  /**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const validCombinations = [];

    fillValidCombinations(0,0, [], n,validCombinations);
    return validCombinations;   
};

const fillValidCombinations = (openCounter,closeCounter, combination, n,validCombinations) => {
    if(openCounter === n && closeCounter === n){
        validCombinations.push([...combination].join(''));
        return;
    }

    if(openCounter !== n){
      combination.push('(');
      fillValidCombinations(openCounter + 1, closeCounter, combination,n,validCombinations)
      combination.pop();
    }
  
  if(closeCounter < openCounter){
      combination.push(')');
      fillValidCombinations(openCounter, closeCounter + 1, combination,n,validCombinations)
      combination.pop();
    }
}
