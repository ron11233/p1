Given strings s1, s2, and s3, find whether s3 is formed by an interleaving of s1 and s2.

An interleaving of two strings s and t is a configuration where s and t are divided into n and m substrings respectively, such that:

input- 3 strings 
output- true if s1,s2 form inteleaving s3
rule: the parts can cut s1,s2 are up to 1 diff. if cut s1 to 2 parts - s2 can be 1-3 parts. must use all chars of both s1 and s2 to build all of s3 so |s1.length+s2.length| = s3.length

constraints 
lengths of all? what chars? can s1+s2 > || != s3? 

0 <= s1.length, s2.length <= 100
0 <= s3.length <= 200
s1, s2, and s3 consist of lowercase English letters.

must check lengths of s1+s2=s3.   



example- s1 = "aacb" s2="mkpa" s3= "amkacpab" return true

tricky: "abc" "a" "addskd" != length return false immidietly 

edge: s1 = "" s2 = "" s3 = "" return true




approaches:
brute force: 
checkCanInterleave(s1Index, s2Index, s1,s2,s3): return canInterleave from those s1,s2 indexes. 
me: if char1 equal s3[s1index+s2index] check with s1Index+1, and also check for char2 and try s2Index+1 if they equal
basecase: s1Index+s2Index === s3.length

n - s1.length
m - s2.length
time: 2^(n+m)
space: n+m

problem: can calc same state many time

better: add memo - key: s1Index,s2Index: true/false - can reach from those indexes to interleave. 
time: n*m states * O(1) every iteration. 
space: n+m

optimized: DP 
Interleave[s1Index][s2Index] - can interleave from s1Indexs2INdex (true/false)
me: iterate level by level from last level (MAth.max(n,m)) - each time check once for s1 once for s2 equals s3[s1Index+s2Index] && Interleave[s1Index][s2Index]. add 1 to s1Index or s2Index depends which u check. 
basecase: Interleave[s1.length][s2Index.length] = true. 
time: n*m states (combination of s1index s2index) with O1 each time
space: n*m - for each state i keep true or false



/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    let maxLevels = Math.max(s1.length,s2.length);
    const interleaveFromIndexes = createInterleaveToIndexes(maxLevels);

    let s1Index = s1.length-1;
    let s2Index = s2.length-1;
  
    while(s1Index > 0 && s2Index > 0){
        if(s1[s1Index] === s3[s1Index+s2Index+1] && interleaveFromIndexes[s1Index+1][s2Index]) interleaveFromIndexes[s1Index][s2Index] = true
        if(s2[s2Index] === s3[s1Index+s2Index] && interleaveFromIndexes[s1Index][s2Index+1]) interleaveFromIndexes[s1Index][s2Index+1] = true
        
    }
};





/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    if(s1.length + s2.length !== s3.length) return false
    return checkCanInterleave(0,0,s1,s2,s3)
};

const checkCanInterleave = (s1Index, s2Index, s1,s2,s3) => {
  
      if(s1Index + s2Index === s3.length) return true;
      
      let canInterleaves1 = false;
      let canInterleaves2 = false;
  
      if(s1[s1Index] === s3[s1Index+s2Index]){
          canInterleaves1 = checkCanInterleave(s1Index + 1, s2Index, s1,s2,s3);
      }

    if(s2[s2Index] === s3[s1Index+s2Index]){
          canInterleaves2 = checkCanInterleave(s1Index, s2Index + 1, s1,s2,s3);
      }
      return canInterleaves1 || canInterleaves2
}




/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleaveWithMemo = function (s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) return false
    const indexesCanInterleave = new Map();
    return checkCanInterleave(0, 0, s1, s2, s3, indexesCanInterleave)
};

const checkCanInterleave = (s1Index, s2Index, s1, s2, s3, indexesCanInterleave) => {

    if (s1Index + s2Index === s3.length) return true;
    if (indexesCanInterleave.has(`${s1Index},${s2Index}`)) return indexesCanInterleave.get(`${s1Index},${s2Index}`);
    let canInterleaves1 = false;
    let canInterleaves2 = false;

    if (s1[s1Index] === s3[s1Index + s2Index]) {
        canInterleaves1 = checkCanInterleave(s1Index + 1, s2Index, s1, s2, s3,indexesCanInterleave);
    }

    if (s2[s2Index] === s3[s1Index + s2Index]) {
        canInterleaves2 = checkCanInterleave(s1Index, s2Index + 1, s1, s2, s3,indexesCanInterleave);
    }
    let canInterleave = canInterleaves1 || canInterleaves2
    indexesCanInterleave.set(`${s1Index},${s2Index}`,canInterleave);
    return canInterleave
}


