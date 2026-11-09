Given an integer array nums, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.

Note that the product of an array with a single element is the value of that element.


input - array of nums
output- largest subarray product
rule: 1 cell subarray product is its value.

constraints
nums length
nums[i] range. can be negetive?? 
  can length nums be 0?? 


1 <= nums.length <= 2 * 104
-10 <= nums[i] <= 10
The product of any subarray of nums is guaranteed to fit in a 32-bit integer.


//if nums length 1 return nums[0]. make sure to treat this case

nums[i] can be negetive. 

  
example [3,2,-4,4,-3,-2] output - -3*4*-4*2*3 


tricky [-4,-4]

edge [3]


approaches:
bruteforce: build every subarray and iterate it - save max result. 
time: n^2 for each n run all its subarrays
space: o(1)

problem - we go through each n many times and make same calculations many times

better: 
if even num of negetive - return product of all 
if odd - calc right left pointers till reaches both negetive nums - take the side with higher product till reach other side (cut smallest side)


walkthrough:




/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    const biggestProduct = findMaxProduct(nums)
    return biggestProduct
};

const findMaxProduct = (nums) => {

    let biggestSoFar = nums[0];
    let smallestSofar = biggestSoFar;
    let bestProduct = biggestSoFar;

    for(let numIndex = 1;numIndex <  nums.length; numIndex++){
        const num = nums[numIndex]
        const previousBiggest = biggestSoFar;
        const previousSmallest = smallestSofar;
        biggestSoFar = Math.max(num, previousBiggest * num,previousSmallest * num )
        smallestSofar = Math.min(num, previousSmallest * num,previousBiggest * num)
        bestProduct = Math.max(bestProduct,biggestSoFar)
    }
    return bestProduct
}




  
