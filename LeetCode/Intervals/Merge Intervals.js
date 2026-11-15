Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.


input - intervals array 
output - non-overlapping interval array



constraints
intevals.length
interval i,j range

1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4






approaches:
brute force: 
first sort- then for each interval try merge with all other intervals. o(n^2) time and O(n) space
problem - iterate every interval many times for no reaoson 


better: sort intervals, then go 1 time through all intervals. if overlap merge else continue. 

  time o(n) space o(n)

optimized: inplace space o(1)


  /**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    const mergedIntervals = [];
    const sortedIntervals = [...intervals].sort((a,b) => a[0] - b[0])
    for(const interval of sortedIntervals){
        const last = mergedIntervals.length === 0
        if(last){
          mergedIntervals.push(interval)
        }
        else if(interval[0] > mergedIntervals[mergedIntervals.length-1][1]){
          mergedIntervals.push(interval)
        }else{
            const lastStart = mergedIntervals[mergedIntervals.length-1][0]
            const lastEnd = mergedIntervals[mergedIntervals.length-1][1]
            mergedIntervals[mergedIntervals.length-1] = [Math.min(lastStart, interval[0]), Math.max(lastEnd, interval[1])]
        }
    }
    
    return mergedIntervals;
};



