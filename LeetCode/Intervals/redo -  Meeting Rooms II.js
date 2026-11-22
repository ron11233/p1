Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.


input [start,end] array of intervals
output int num min number of conference rooms required 

constraints 
start i end i 
intervals length

1 <= intervals.length <= 10^4
0 <= starti < endi <= 10^6

examples

normal[[8,12], [6,8], [7,11], [3,5]] ret 2 
tricky 1,10  3,7 5,6 re 3 
edge 0,3 ret 1 

approaches: 
brute force: sort, for each intervals i - go through all intervals until not overlapping. keep max for overlaps. return the max. 
O(n^2 + nlogn = n^2)

problem - calculating same overlaps many times

better: sort intervals. start with overlappingMeetingsCount = 0. create a normal queue. if queue empty insert.  if not - on a while loop - check first item to come out (queue will be ordered lowest value first) - if queue value < meetings start - dequeue and overlappingMeetingsCount --. then dequeue meeting end value. always keep max to track max overlaps. 

time: nlogn sort + n - iterate all intervals * while(max n vals inside if all overlap but the last one)- so nlogn * n^2 = O(n^2)
space: n - sortedIntervals + queue max n = O(n) 


walkthrough: 
create: 
        maxOverlaping
        overlapingMeetingsEnd = new queue
sortedIntervals - sort intervals by start val
iterate through sortedIntervals 

cleanEmptyMeetings(overlapingMeetingsEnd, meetingStart) - peek on val if < meetingstart dequeue - do it on while and count the times u did.  // return times
add endTime of current meeting to the queue. 
maxOverlaping - max maxOverlaping, overlapingMeetingsEnd.size().

  

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    let maxOverlapping = 0;
    const overlapingMeetingsEnd = new MinPriorityQueue();

    const sortedIntervals = [...intervals].sort((firstInterval,secondInterval) => firstInterval[0] - secondInterval[0]); // sort by start 

    for(const [start,end] of sortedIntervals){  
        cleanEmptyMeetings(overlapingMeetingsEnd, start);
        overlapingMeetingsEnd.enqueue(end);
        maxOverlapping = Math.max(maxOverlapping, overlapingMeetingsEnd.size())
    }
  return maxOverlapping;
};


const cleanEmptyMeetings = (overlapingMeetingsEnd, start) => {
    while(overlapingMeetingsEnd.size() > 0 && overlapingMeetingsEnd.front() <= start){
        overlapingMeetingsEnd.dequeue();
    }
 }

