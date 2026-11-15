Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.



input string s 
output: all partitions that makes every item of s a palindrom. 
rule: if i cut s to substrings - every cell of that cut needs to be its own palindrom. 


constraints: 
s min max length 

1 <= s.length <= 16
s contains only lowercase English letters.


example Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]


approahces: 
everytime decide kee




runthrough
have helper function to getall combinations

each time it will check if currentpath is palindrom. if it is - try to add next char and call. then remove it. then try cut. and call without it on the path empty

















  /**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const getAllPartitions(0,[],s);
};

const getAllPartitions = (currentIndex, path,string) => {

    if(string)

    
}




