<LeetCode link>

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.


1. PROBLEM
   Input:   head of linked list might be with cycles
   Output:   true if there is cycle false if normal LL
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -   length of list? 
   -   can value be same? 

   GIVEN:
      The number of the nodes in the list is in the range [0, 104].
      -105 <= Node.val <= 105
      pos is -1 or a valid index in the linked-list.


3. EXAMPLES
   normal: 1 2 3 4 
   tricky:
   edge:


4. APPROACHES
   1. Naive:  run with 2 pointers one 1 step second 2 step. if one of them reaches null finished. if reach each other cycle  Time O(nodes num)  Space O(1)
   2. Better:   Time O(...)  Space O(...)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let slowPointer = head;
    let fastPointer = head;

   while(fastPointer && fastPointer.next){
      slowPointer = slowPointer.next
      fastPointer = fastPointer.next.next
      if(slowPointer === fastPointer)return true
   }
   
   return false
};

7. VERIFICATION
