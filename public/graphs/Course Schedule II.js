
/*
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.



 *
 * 1. PROBLEM
 *    Input:  ...        Output: ...        Rule: ...
 *
 * 2. CONSTRAINTS → IMPLICATIONS
 *    - ...
 *
 * 3. EXAMPLES
 *    normal: ...   tricky: ...   edge: ...
 *
 * 4. APPROACHES
 *    1. Naive:   ...   Time O(V+E)^2  Space O(V+E)
 *    2. Better:  ...   Time O(V+E)  Space O(V+E)
 *    → implementing #_ because ...
 *
 * 5. CODE below     

    
     
 * 6. TESTS: step | state | result
 * 7. FOLLOW-UPS: ...
 
 */

var findOrder = function(numCourses, prerequisites) {
    const preToCourses = new Map();
    const courseToPres = new Map();
    const visited = new Set();
    const orderOfCourses = []

    for(const [course,prerequisite] of prerequisites){
        if(!preToCourses.has(prerequisite)) preToCourses.set(prerequisite, new Set())
        if(!courseToPres.has(course)) courseToPres.set(course,new Set())

        preToCourses.get(prerequisite).add(course)
        courseToPres.get(course).add(prerequisite)
    }

    const queue = new Queue([])

    for(let course = 0; course < numCourses; course++ ){
        if(!courseToPres.has(course)) {
            queue.enqueue(course)
            visited.add(course)
            orderOfCourses.push(course)
        }
    }

    while(!queue.isEmpty()){
    const currentCourse = queue.dequeue()

    const dependentCourses =  preToCourses.get(currentCourse) ?? []

    for(const dependentCourse of dependentCourses){
        if(
        courseToPres.get(dependentCourse).delete(currentCourse);
        if(courseToPres.get(dependentCourse).size === 0){
            queue.enqueue(dependentCourse)
            visited.add(dependentCourse)
            orderOfCourses.push(dependentCourse)
        }
    }

    return visited.size === numCourses ? orderOfCourses : 0 


    }
    
};
