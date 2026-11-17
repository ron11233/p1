Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.




input- int array nums
output- array answers int 
rule: answer[i] is the product of all the elements besides nums[i] 

constraints
nums.length
nums[i] range - can be negetive / 0? 

  2 <= nums.length <= 105
-30 <= nums[i] <= 30
The input is generated such that answer[i] is guaranteed to fit in a 32-bit integer.

examples 3,2,-3,-10 res [-60,90, -60, -18]
tricky- 0,3,-3 res [-9,0,0]
edge [0,3] res [3,0]

approaches
bruteforce: 
for each number - calc product of all other nums and add to his index. 
  time n^2
space o(n)
problem - recalculating many times the products of all nums

better: iterate through the array from i+1. keep rightProduct array and leftProduct array. each answer[i] will be right[i] + left[i]. 
time: O(n) 
space: O(n) 

walkthrough: 
create leftProducts, rightProducts array of n length.
have fillProducts(leftProducts,rightProducts,nums) - returns null
insert productsToAnswer(leftProducts,rightProducts) - returns int array answers.

fill products- set rightProduct - nums[nums.length-1], left product nums[0]. start iteration from i=1. 
put the leftProduct on leftProducts[i], rightProduct on rightProducts[nums.length-i-1], and then leftProduct *= nums[i], rightProduct *= nums[nums.length-1-i].

productsToAnswer- answers[i] = leftProducts[i] + rightProducts[i] returns answers.




  /**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const leftProducts = [];
    const rightProducts = [];
    fillProducts(leftProducts,rightProducts,nums);
    return productsToAnswer(leftProducts,rightProducts); 
};


const  fillProducts = (leftProducts,rightProducts,nums) => {
    let currentLeftProducts = 1;
    let currentRightProducts = 1;

    for(let leftIndex = 0; leftIndex < nums.length; leftIndex++){
        const rightIndex = nums.length-leftIndex-1;

        leftProducts[leftIndex] = currentLeftProducts;
        rightProducts[rightIndex] = currentRightProducts;

        currentLeftProducts *= nums[leftIndex];
        currentRightProducts *= nums[rightIndex];
    }
}

const productsToAnswer = (leftProducts,rightProducts) => {
    const answers = []; 

    for(let answerIndex = 0; answerIndex < leftProducts.length; answerIndex++){
        answers[answerIndex] = leftProducts[answerIndex] * rightProducts[answerIndex];
    }
    return answers;
}


