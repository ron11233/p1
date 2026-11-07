Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).


input - points array where each cell is [x,y] indicies, and - k integer
output-the k closest points to the origin 
rule- closest to 0,0 is calc by Abs - xi + Abs - yi. need to return the point with the Kth smallest sum(xi, yi)

constraints
xi , yi values? can be minus? need to take care negetive values with Absolute
can k be bigger than points size 
points range 

given 
1 <= k <= points.length <= 104
-104 <= xi, yi <= 104

example 
-1,1 2,1 0,0 k=2 return -1,1


edge: -1 k =1 

approaches
brute force: 
for each k, find closest point - tag it as seen. on last run return. k * points.length (n) space: O(k) - keep k smallest
problem : iterate the points array many times

optimized: use maxHeap of K + 1 size. iterate all points - maxHeap kth is our wanted point. return it. need to care for calc on prioritze. time- On*logk space log(k)


walkthrough: 
have maxHeap. run through points. define maxheap prioritize by abs xi + abs yi. enqueue all points. when size of heap k+1 - dequeue. 
  when finish if heap size k+1 dequeue - and result is next dequeue






  /**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    const pointsByDistance = new MaxPriorityQueue((point) => Math.sqrt(Math.pow(point[0],2) + Math.pow(point[1],2) ))

    for(const [x,y] of points){
        if(pointsByDistance.size() === k+1) pointsByDistance.dequeue()
        pointsByDistance.enqueue([x,y]);
    }
     if(pointsByDistance.size() === k+1) pointsByDistance.dequeue()

    const kthClosestPoints = [];

    while(!pointsByDistance.isEmpty())kthClosestPoints.push(pointsByDistance.dequeue())
    return kthClosestPoints;
};
