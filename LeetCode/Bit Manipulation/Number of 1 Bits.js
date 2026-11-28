Given a positive integer n, write a function that returns the number of set bits in its binary representation (also known as the Hamming weight).



/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    const BIT_COUNT = 32; 
    let onesCount = 0; 

    for(let bitIndex = 0; bitIndex < BIT_COUNT; bitIndex++){
        if((n >> bitIndex) & 1){
            onesCount++;
        }
    }
    return onesCount;
};

















  /**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    
};
