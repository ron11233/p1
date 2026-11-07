You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.

Return the minimum number of CPU intervals required to complete all tasks.


input - tasks array - filled with Letters, and number n- which indicats how many tasks i have to process until can process task from same letter. 
output - minimum number of intervals required to complete all tasks. 
rule: every task letter i put - i need n intervals till next letter. i can either process other letters tasks - or idle and waste time. i need to return minimum intervals numbeter


constraints 
max n? if n=1 can just process all directly and num is tasks.length
min n

cpu tasks only capital letters from A to Z? max min range of CPU array 

given-
   1 <= tasks.length <= 104
  tasks[i] is an uppercase English letter.
  0 <= n <= 100

n=0 no need any idle is same like n=1.

example
BABCA n=2



edge k=1 ABDS


approaches 
bruteforce: 

iterate n time. for each n - first find mostOccurances task - put it in results. also have seen Set to track. then put 2nd most then 3rd most n times. if seen all - put idle on the size diff between n and seen. then repeat. Time - for each n * - go all n find most - * k times. n^k. space- seen is n max. like say O(n) 


Better: MaxHeap - count each occurance of each letter, and put it in dictionary / array (26 array). then - put all keyvalues in MaxHeap - sort by numofoccurance. every time take out of heap - then put results - and substract occurance. keep it in new key value. run n times. if queue is empty - put on the rest of n idle. then push all new array back to queue iterate again. 
  time complexity: counting all nums is O(n) + , push all to maxheap is UniqueChars- U - so UlogU +, then every time i dequeue n times so n*log(U) and then put back inside which is nlogu again. total is nlogu + ulogu space is O(n)

walkthrough: 
key - letter to value - numofoccurance map
put all dict in maxheap

while still have values in minheap- 
  
run n loop - each time if not empty queue take 1 out - increase maxIntervals and decrease numofocurrances - then keep it in new dict. if empty just increase maxIntervals.

return maxintervals

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    const letterToMaxOcurrances = createLetterToMaxOccurances(tasks);
    const letterToOccurancesMaxHeap = new maxPriorityQueue(([letter,occurances]) => occurances);
    pushLettersOccurancesToMaxHeap(letterToOccurancesMaxHeap, letterToMaxOcurrances);
    let minIntervals = 0;
    while(!maxHeap.isEmpty()){
        const usedLettersToOcurrance = new Map();
        for(let currentIntervalWindow = 0; currentIntervalWindow<n; currentIntervalWindow++){
          
              if(letterToOccurancesMaxHeap.isEmpty() && usedLettersToOcurrance.size === 0) return minIntervals;
              if(!letterToOccurancesMaxHeap.isEmpty()){
                  const [letter,occurances] = letterToOccurancesMaxHeap.dequeue();
                  occurances--;
                  occurances !== 0 && usedLettersToOcurrance.set(letter,occurances);
              }
          minIntervals++;
        }
      pushLettersOccurancesToMaxHeap(letterToOccurancesMaxHeap, usedLettersToOcurrance);
    }

  return minIntervals;
};

const createLetterToMaxOccurances = (tasks) => {
    const letterToMaxOcurrances = new Map();

    for(const task of tasks){
        if(!letterToMaxOcurrances.has(task))letterToMaxOcurrances.set(task,0);
        letterToMaxOcurrances.set(task, letterToMaxOcurrances.get(task) + 1);
    }
  return letterToMaxOcurrances;
}

const pushLettersOccurancesToMaxHeap = (letterToOccurancesMaxHeap,letterToOcurrances) => {
      for([letter,occurances] of letterToOcurrances.entries()){
          letterToOccurancesMaxHeap.enqueue([letter, occurances])
      }
}

  
