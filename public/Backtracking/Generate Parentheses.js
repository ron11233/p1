Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.


input  number n  - represents number- pairs of parentheses
output - all valid combinations of those pairs together
rule: it needs to be correct usage of parentheses. 



  constraints 
n max min .. 
  1 <= n <= 8

n=1 return [()]

example n=2 (()), ()()


approache: 

i have 2 options. add or skip(open). 
in both of them - i get all path. if i opened i need to close also at the end. so i need to pass indication i opened so i will close at the end.


i will iterate from all n:


skip - explore with n-1: but mention u opened in variable. so actually we need to know how many opened. 
add - push () to path and keep with n-1


base case -  n=0 - close all u opened. 

  /**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const allCombinations = [];
    generateAllCombinations(0,0,n,[],allCombinations)
    return allCombinations
};

const generateAllCombinations = (open,close,n,path, allCombinations) => {
    if(open === n && close === n){
        allCombinations.push([...path].join(""));
        return;
    }

    if(open < n){
        path.push('(');
        generateAllCombinations(open+1,close,n,path,allCombinations)
        path.pop()
    }

    if(close < open){
        path.push(')');
        generateAllCombinations(open,close+1,n,path,allCombinations)
        path.pop()
    }
}



