You are given an array of meeting times intervals where intervals[i] = [starti, endi].

A person can attend all meetings if no two meeting intervals overlap. Meetings ending at time t and starting at time t do not overlap.

​​​​​​​Return true if a person can attend all meetings. Otherwise, return false.



approaches
brute force

iterate each meeting -> for each metting iterate all other meetings check if any overlap
time on^2 space o1
problem: checking each meeting many times

better: sort - then if any overlap return false at the end return true 

time onlogn space on



0 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti < endi <= 106








  /**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function(intervals) {
      if(intervals.length === 0) return true
  
      const sortedIntervals = [...intervals].sort ((a,b) => a[0] - b[0])
      let prevEnd = sortedIntervals[0][1]

      for(let sortedIntervalIndex = 1; sortedIntervalIndex < sortedIntervals.length; sortedIntervalIndex++){
          const currentIntervalStart = sortedIntervals[sortedIntervalIndex][0]
          const currentIntervalEnd = sortedIntervals[sortedIntervalIndex][1]
          
          if(currentIntervalStart < prevEnd){
              return false
          }else{
              prevEnd = currentIntervalEnd
          }
      }
      return true;
};
