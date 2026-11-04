<LeetCode link>

    You are given the head of a singly linked-list. The list can be represented as:
    
    L0 → L1 → … → Ln - 1 → Ln
    Reorder the list to be on the following form:
    
    L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
    You may not modify the values in the list's nodes. Only nodes themselves may be changed.




1. PROBLEM
   Input: normal list's head
   Output: ordered list by i -> n-i
   Rule: 


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - how many nodes?
   -

   GIVEN:
    The number of nodes in the list is in the range [1, 5 * 104].
    1 <= Node.val <= 1000


3. EXAMPLES
   normal:
   tricky:
   edge:


4. APPROACHES
   1. Naive:    Time O(...)  Space O(...)
   2. Better:   Time O(...)  Space O(...)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
  let secondHalfPointer = head;
  let fastPointer = head;
  
  while(fastPointer && fastPointer.next){
      secondHalfPointer = secondHalfPointer.next
      fastPointer = fastPointer.next.next
  }
  
  prevPointer = secondHalfPointer;
  let currentNode = secondHalfPointer.next 

  while(secondHalfPointer){
      nextPointer = currentNode.next
      currentNode.next = prevPointer
      prevPointer = currentNode;
      currentNode = nextPointer
  }

  
  let firstHalfTail = head;

  while(secondHalfPointer){
      const nextFirstHalf = firstHalfTail.next
      const nextSecondHalf = secondHalfPointer.next
    
      firstHalfTail.next = secondHalfPointer;
      secondHalfPointer.next = nextFirstHalf;

      secondHalfPointer = nextSecondHalf
      firstHalfTail = nextFirstHalf
    
    
  }
    
};


7. VERIFICATION
