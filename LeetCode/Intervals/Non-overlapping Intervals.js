Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.


input - array of intervals
output- int num - min num of intervals need to be removed for the array to be non-overlaping


constraints
intervals.length
intervals[i] range 


exmaples 
[[1,2],[1,3], [2,3] result 1 

1 <= intervals.length <= 10^5
intervals[i].length == 2
-5 * 10^4 <= starti < endi <= 5 * 10^4


tricky [[1,2],[1,3], [2,3] [2,4] res- 2

edge    [1,2] res - 0


approaches: 

brute force: 
go with recursion - for each interval go 1 recursion with keep 1 with skip. all the way. keep minimum removals (smallest skip) track.
time: 2-keep/skip^10^5-intervalslength. 
space: 10^5. 

problem- iterating all possible options. can check only necessary overlaps. 
  

better: sort first keep prevStart and prevEnd-  at first itll be first element. start iterating from index 1 all intervals. check for overlap with prev. if overlap - remove the one that has heighest end. keep on prev the one with lower end. have count for each overlap removal. 



time: nlogn for sort + O(n) for iteration.  nlogn time 
space O(1). 









  /**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    const sortedIntervals = [...intervals].sort((a,b) => a[0] - b[0])
    let prevStart = sortedIntervals[0][0];
    let prevEnd = sortedIntervals[0][1];
    let minRemovalsCount = 0;
  
    for(let sortedIntervalsIndex = 1; sortedIntervalsIndex < sortedIntervals.length; sortedIntervalsIndex++){
          const intervalStart = sortedIntervals[sortedIntervalsIndex][0];
          const intervalEnd = sortedIntervals[sortedIntervalsIndex][1];

          if(isOverlapping(intervalStart,intervalEnd, prevStart,prevEnd)){//keep prev with lower end
            prevEnd = Math.min(prevEnd, intervalEnd);
            minRemovalsCount++;
          }else{
             prevStart = intervalStart;
             prevEnd = intervalEnd;
          }
    }

  
    return minRemovalsCount  
};


const isOverlapping = (intervalStart,intervalEnd, prevStart,prevEnd) => {
    return (prevStart >= intervalStart && prevStart < intervalEnd) || (intervalStart >= prevStart && intervalStart < prevEnd)
}
