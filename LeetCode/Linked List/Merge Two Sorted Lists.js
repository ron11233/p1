<LeetCode link>

You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.


1. PROBLEM
   Input:
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -negetive nums? can any be empty? duplicate nums? 
   - 1 empty return second both empty return null? 

     

   GIVEN:
   The number of nodes in both lists is in the range [0, 50].
    -100 <= Node.val <= 100
    Both list1 and list2 are sorted in non-decreasing order.

so can have duplicates and empty lists. 


3. EXAMPLES
   normal: 1 
   tricky:
   edge:


4. APPROACHES
   1. Naive: iterate and check when list1 node between / equal list2 node. then merge that item and keeplikethat   Time O(l1.length +l2.length)  Space O(1)
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode();
    let tail = dummy;


    while(list1 && list2){
        if(list1.val <= list2.val){
            tail.next = list1;
            list1 = list1.next
        }else{
            tail.next = list2;
            list2 = list2.next
        }
        tail = tail.next;
    }

    tail.next = list1 || list2;
    return dummy.next
};


7. VERIFICATION
