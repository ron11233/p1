<LeetCode link>

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -    n range height[i] range
   -    if only 1 return 0? 
   -   if 2 return min of them? 

   GIVEN:
     n == height.length
    2 <= n <= 105
    0 <= height[i] <= 104


3. EXAMPLES
   normal:  HEIGHTS= 2,5,1,6,3,6,2,3 n = 7
   tricky:  
   edge: 3,2


4. APPROACHES
   1. Naive:  for each height, go all other heights and try build container from min of the edges ofcourse. keep max container    Time O(n^2)  Space O(1)

problem : we calculate each container many times

   2. Better: iterate left = 0 right = n-1. calculate container-  then move the lower one. for example 2,3 my example. 2<3 so left++. that way till right===left  Time O(n)  Space O(1)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let mostWater = 0;
    let leftIndex = 0; 
    let rightIndex = height.length - 1;
    
    while(rightIndex>leftIndex){
        const leftHeight = height[leftIndex];
        const rightHeight = height[rightIndex];

        const currentWater = Math.min(leftHeight,rightHeight) * (rightIndex - leftIndex)
      
        mostWater = Math.max(mostWater,currentWater);

      if(leftHeight > rightHeight)rightIndex--;
      else leftIndex++;
    }
  
    return mostWater
};

7. VERIFICATION
