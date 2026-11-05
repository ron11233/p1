<LeetCode link>

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.




1. PROBLEM
INIT
   Input: size 
   Output: init size of capacity
   Rule:
GET
   PROBLEM
   Input: key
   Output:return value if exists if not -1 
   Rule:
PUT
   PROBLEM
   Input: key, val - if exists update, if new insert and make sure LRU cache in right size 
   Output:
   Rule:


2. CONSTRAINTS
   My questions, before looking at the given constraints:
   -   max capacity? value is only int? or what is value? 
   -

   GIVEN:
   1 <= capacity <= 3000
   0 <= key <= 104
   0 <= value <= 105
   At most 2 * 10^5 calls will be made to get and put.

 
3. EXAMPLES
   normal: 1 2 3 4 CAPACITY 4 - then add 7
   tricky:
   edge:


4. APPROACHES
   1. Naive:  i dont have idea about naive. my idea is Linkedlist with map. map will store keyvalue - linkedlist every new get will add to root  Time O(o1)  Space O(capacity)
   2. Better:   Time O(...)  Space O(...)
   3. Optimal:  Time O(...)  Space O(...)
   → implementing #_ because ...


5. WALKTHROUGH: step | state | result


6. CODE below

/**
 * @param {number} capacity
 */

var Node = function (key,value){
      this.key = key
      this.value = value
      this.next = null
      this.prev = null 
}
   
var LRUCache = function(capacity) {
    this.keyValue = new Map()
    this.maxSize = capacity
    this.head = null
    this.tail = null
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
         if(!this.keyValue.has(key))return -1;
         const node = this.keyValue.get(key);
         if(!this.head && this.tail){
            this.head = node;
            this.tail = node;
         }else{
          node.next = this.head;
          this.tail = node;
          node.next.prev = node;
         }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
       if(this.keyValue.has(key)){
            this.keyValue.set(key, [key,value]);
             this.get(key)
       }else{
          const linkedListNode = new LinkedList([key,value]);
          this.keyValue.set(key,linkedListNode);
          this.get(key)
   
         if(this.maxSize === keyValue.size){
               const lastUsedNode = this.tail;
               this.tail = lastUsedNode.prev;
               this.tail.next = null;
               const [lastNodeKey, lastNodeVal] = lastUsedNode.val;
               this.keyValue.remove(lastNodeKey);
               lastUsedNode = null;
            }
       }

   
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


7. VERIFICATION
