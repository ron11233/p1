<LeetCode link>

Given the head of a singly linked list, reverse the list, and return the reversed list.




1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   - what n limit? range?  if no nodes return null? 1 node just return ok
   -

   GIVEN:
      The number of nodes in the list is the range [0, 5000].
      -5000 <= Node.val <= 5000



3. EXAMPLES
   normal:1 -> 3 -> 5 -> -3 
   tricky: -4
   edge: null


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
 * @return {ListNode}
 */
var reverseList = function(head) {
   
   let prevNode = null
   let currentNode = head
   
   while(currentNode){
      let nextNode = currentNode.next
      currentNode.next = prevNode
      prevNode = currentNode
      currentNode = nextNode
   }
   
   
   return prevNode;
};


7. VERIFICATION
