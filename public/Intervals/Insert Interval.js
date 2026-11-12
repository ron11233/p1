You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Two intervals are considered overlapping if they share at least one point.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.


input - intervals array non-overlapping asc ordered by starti, and newIntervals. 
output- intervals array that includes both intervals
rule: merge so they are ordered asc by starti, and no overlappings.

constraints
intervals length, new intervals length 
intervals[i] size new intervals[i] size

0 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^5
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 10^5

example intervals-  [1,3],[4,6], [7,8] return [1,6], [7,8]
    newIntervals    [2,5], [1,3] , [6,6]


tricky: [0,0], [1,1] return [0,0] [1,2]
        [1,2]

edge [], [] return [].


approaches:
brute force - 
  for each newintervals iterate all intervals. if theres overlap merge it. after merge also iterate intervals to merge overlaps. 
  time: newIntervals*intervals
  space O(1)

  
  better: order new intervals by starti asc. every iteration check if intervals starti>=newIntervals starti && endi <= newStartI || opposite. if so - make new intervals slot with min start max end, and run with it. run with while - everytime find merge merge into intervals. if newInteravls starti > intervals endi, can push to new array that intervals and index++. 
  time: intevalsLength + newIntervalsLength + newIntervalsLength Log newIntervalsLength so newIntervalsLength log newIntervalsLength + intevalsLength
space: intevalsLength + newIntervalsLength 




walkthrough:
have index for intervals index for newintervals. start at 0 0 
if first overlaps - push, and both indexes++. then every check first check if overlap with current mergeArray last item. if not check if newIntervals and intervals merge and do same. 




/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    const mergedIntervals = [];
    newInterval.sort((a,b) => a[0]-b[0])

    const mergeNewIntevals(intervals,newIntervals,mergeIntervals);
    const mergeIntervals(mergeIntervlas);
  
    return mergedIntervals;
};

const mergeNewIntevals = (intervals,newIntervals,mergeIntervals) => {
  let intervalsIndex = 0;
  let newIntervalsIndex = 0;


  while(newIntervalsIndex < newIntervals.length && intervalsIndex < intervals.length){
        const interval = intervals[intervalsIndex]
        const newInterval = newIntervals[newIntervalsIndex];
    
        if(isOverlapping(interval, newInterval)){
             intervals[intervalsIndex] = [Math.min(interval[0], newInterval[0]), Math.max(interval[1], newInterval[1])]
             newIntervalsIndex++;
        }
        else if(isIntervalAhead(interval, newInterval)){ // interval start is after newinterval end
            newIntervalsIndex++;
        }else{
            mergeIntervals.push(interval);
            intervalsIndex++;
        }
  }

  while(newIntervalsIndex < newIntervals.length){
        mergeIntervals.push(newIntervals[newIntervalsIndex])
        newIntervalsIndex++;
  }

  while(intervalsIndex < intervals.length){
        mergeIntervals.push(newIntervals[newIntervalsIndex])
        intervalsIndex++;
  }
}

const isOverlapping = (interval, newInterval) => {
    return  (newInterval[0] >= intervals[0] && newIntervals[0] <= intervals[1]) || (interval[0] >= newIntervals[0] && interval[0] <= newIntervals[1]) 
}

const isIntervalAhead = (interval, newInterval) => {
    return interval[0] > newInterval[1]
}
