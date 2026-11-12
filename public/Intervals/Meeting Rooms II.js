Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.



input - array of intervals [start,end] 
output- num int - min amount of conferrence rooms req
rule: if 2 meetings are overlapping - must have another conference room

constraints
1 <= intervals.length <= 10^4
0 <= starti < endi <= 10^6


examples 
normal - 1,4    1,20    3,5    4,6   2,6 result 4 - bettwen 3 till 4 

tricky-
  
edge - 1,4 return 1 

  
approaches
brute force: for each hour from 1 to 10^6, iterate through intevals.length. keep max overlap. every time iterate check what hour have meetings.
  time: 10^6 * 10^4 
  space: o(1)

problem: most hourts might not exist, iterating every hour and every interval wastelesly 

better: bucket count for each hour - take max at the end. 
  time: O(n.length*intervals[i][0].val - max 10^6) so its 10^4 * 10^6
  space: 10^6 

optimized: 
















  /**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
    
};
