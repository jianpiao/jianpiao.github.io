# js数据结构与算法

学习最常用，最简单的数据结构与算法

## 1. 数组

数组是最简单的内存数据结构。

```javascript
let arr = [] // 声明数组，并设置数组初始值为空

// 在数组末尾插入元素
arr.push(1)

// 在数组开头插入元素
arr.unshift(2)

// 在数组开头插入元素
Array.prototype.insertEl = function(value){
  for(let i = this.length; i >= 0; i--){
    this[i] = this[i-1]
  }
  this[0] = value
}
arr.insertEl(0)


// 从数组末尾删除元素（通过push和pop可以模拟栈）
arr.pop()

// 从数组开头删除元素
for(let i=0; i<arr.length; i++){
	arr[i] = arr[i+1]
}

// 删除数组第一个元素
arr.shift()

// 删除数组任意位置的元素,这里是代表从索引下标为2的位置删除1个元素
arr.splice(2,1)
```

## 2. 栈

栈是一种遵循 **后进先出(LIFO)**原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称为栈顶，另一端叫做栈低。

生活中有很多栈的例子，比如一摞书，要取下面的书，得先把上面的书拿起来。比如浏览器记录，基本数据类是存储在栈内存中的。

```javascript
class Stack {
  constructor() {
    this.items = []
  }

  // 添加元素到栈顶
  push(item) {
    this.items.push(item)
  }

  // 移除栈顶元素，同时返回被移除的元素
  pop() {
    return this.items.pop()
  }

  // 返回栈顶的元素
  peek() {
    return this.items[this.items.length - 1]
  }

  // 查看是否为空
  isEmpty() {
    return this.items.length === 0
  }

  // 栈里元素的个数
  size() {
    return this.items.length
  }

  // 清空栈里所有元素
  clear() {
    this.items = []
  }
}

let stack = new Stack()
stack.push(1)
stack.push(2)
console.log(stack.items)
console.log(stack.pop())
console.log(stack.peek())
console.log(stack.isEmpty())
console.log(stack.size())
stack.clear()
console.log(stack.items)
```

## 3. 队列

队列是遵循 **先进先出(FIFO)**原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须要在队列的尾部。

在现实中，最常见的队列的例子就是排队。

```javascript
class Queue{
  constructor(){
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  
  // 向队列尾部添加一个元素（由于items属性是一个js对象，它是一个键值对的集合，我们要把count变量作为items的对象的键，对应值。将元素加入队列后，count变量加1）
  enqueue(e){
    this.items[this.count] = e
    this.count++
  }
  
  // 从队列移除元素
  dequeue(){
    if(this.isEmpty()){
      return undefined
    }
    count result = this.items[this.lowestCount] // 暂存被删除的值
    delete this.items[this.lowestCount] // 删除队列元素
    this.lowestCount++ // 让key加1，指向第二个元素，则第二个元素变成了队列头部元素
    return result  // 把删除的值返回出去，展示被删除的值
  }
  
  // 查看队列头部元素
  peek(){
    if(this.isEmpty()){
      return undefined
    }
    return this.items[this.lowestCount]
  }
  
  // 检查队列是否为空，并获取它的长度
  isEmepty(){
    return this.count - this.lowestCount === 0;
  }
  
  // 清空队列
  clear(){
    this.items = {}
    this.count= 0
    this.lowestCount = 0
  }
}


```

## 4. 链表

链表存储有序的元素集合，不同于数组，链表中的元素在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。

链表结构如下图：

![image-20210214175050236](https://pic2.zhimg.com/80/v2-190c1826eb6d9db5a7bd333f9c11d043_720w.png)

**数组和链表的差异**

* 数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素。
* 相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。

下面实现链表结构：

```javascript
function defaultEquals(a, b) {
  return a === b
}

class Node {
  constructor(element) {
    this.element = element
    this.next = undefined;
  }
}

// 创建列表类
class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined;
    this.equalsFn = equalsFn
    this.node = new Node()
  }

  // 添加元素
  push(element) {
    const node = new Node(element)
    let current;
    if (this.head == null) {
      this.head = node
    } else
    {
      current = this.head
      while (current.next != null) { // 获取最后一项
        current = current.next
      }
      current.next = node  // 将其next赋值为新元素，建立连接
    }
    this.count++
  }

  // 从链表对应位置移除元素
  removeAt(index) {
    // 检查越界值
    if (index > 0 && index < this.count) {
      let current = this.head
      if (index === 0) { // 移除第一个元素，第二个元素就变成了第一个元素
        this.head = current.next
      } else {
        const pervious = this.getElementAt(index - 1)
        current = pervious.next
        pervious.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  // 复用移除方法
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  // 移除元素
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 在任意位置插入元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head;
        node.next = current
        this.head = node
      } else {
        const pervious = this.getElementAt(index - 1);
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++;  // 更新链表长度
      return true
    }
    return false
  }

  // 返回一个元素的位置
  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1;
  }

  // 链表元素的个数
  size() {
    return this.count
  }

  // 是否为空
  isEmpety() {
    return this.size() === 0
  }

  // 获取头部
  getHead() {
    return this.head
  }

}


const list = new LinkedList()
list.push(15)
list.push(10)
console.log(list)
list.remove(10)
console.log(list)
list.push(11)
list.push(12)
console.log(list)
console.log(list.size())
console.log(list.getHead())
```

## 5. 集合

集合是由一组无序且唯一（不重复）的项组成的。

```javascript
class Set{
  constructor(){
    this.items = {}
  }
  
  // 检查是否存在某个项
  has(){
    return element in items
  }
  
  // 添加
  add(){
    if(!this.has(element)){
      this.items[element] = element
      return true
    }
    return false
  }
  
  // 删除
  delete(element){
    if(this.has(element)){
      delete this.items[element]
      return true
    }
    return false
  }
  
  // 清空
  clear(){
    this.items = {}
  }
  
  // 数量
  size(){
    return Object.keys(this.items).length
  }
  
  // 返回一个包含集合所有元素的数组
  values(){
    return Object.values(this.items)
  }
}

const set = new Set()

set.add(1)
console.log(set.values())
console.log(set.has(1))
console.log(set.size())
```

## 6. 字典和散列表

在计算机科学中，字典经常用来保存对象的引用地址。ES6中包含了Map的实现，即我们说的字典。

## 7. 递归

假设要计算5的阶乘，我们使用很多方法，比如循环发，比如递归，这次就讲讲递归的实现。

数的阶乘，定位的n!,表示从1到n的整数的乘积。

5的阶乘表示为5！，等同于 5 * 4 * 3 * 2 * 1，结果是120；

### 迭代阶乘n

如果尝试表示计算任意数n的阶乘的步骤，可以将步骤定义如下：`(n) * (n - 1) * (n - 2) * ... * (n - (n-1))`

可以循环写一个计算阶乘的函数：如下

```javascript
function factorial(number){
  if(number < 0) return undefined;
  let total = 1;
  for(let n=number; n > 1; n--){
    total  = total * n
  }
  return total
}

console.log(factorial(5))  // 120
```

我们可以从给定的number开始计算阶乘，并减少n，直到它的值为2，因为1的阶乘还是1，而且它已经被包含在total变量中了。0的阶乘也是1，负数的阶乘不会被计算。

### 递归阶乘

我们通过递归的方式重写上面的例子。

```javascript
function factorial(n) {
  if (n === 1 || n === 0) {  // 基线条件
    return 1
  }
  return n * factorial(n - 1)  // 递归调用
}

console.log(factorial(5)) // 120
```

## 8. 树

树是一种分层数据的抽象模型，现实生活中最常见的树的结构例子是家谱，如下图：

![image-20210215222056676](https://pic1.zhimg.com/80/v2-98ff67ed450ec003aec115681957ddbb_720w.png)

### 树的相关术语

**前提提要**

二叉搜索树(术语)：**BST**

这个术语很重要，在后面会经常出现。

一个树的结构包括一系列存在父子关系的节点。每个节点都有一个父节点(除了顶部的第一个 节点)以及零个或多个子节点:

![image-20210215222212734](https://pic2.zhimg.com/80/v2-a7c9dbd8e56bc8a600ee7106ea008370_720w.png)

### 树的遍历

遍历一棵树是指访问树的每个节点并对它们进行某种操作的过程。

#### 中序遍历

中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。

中序遍历顺序：

![image-20210215222739767](https://pic2.zhimg.com/80/v2-a7c9dbd8e56bc8a600ee7106ea008370_720w.png)

#### 先序遍历 

先序遍历是以优先于后代节点的顺序访问每个节点的。

![image-20210215222824731](https://pic1.zhimg.com/80/v2-5cb19a2f85886425d4d535c7021d8012_720w.png)

#### 后序遍历

后序遍历则是先访问节点的后代节点，再访问节点本身。

![image-20210215222923870](https://pic1.zhimg.com/80/v2-db1a0a718c30251874d9e6da495228c0_720w.png)



## 9. 二叉堆和堆排序

二叉树，也就是堆数据结构。二叉树在计算机科学中一种非常著名的数据结构，由于它能高效、快速的找出最大值和最小值，常备应用于优先队列。也常被用于著名的堆排序算法中。

### 二叉堆数据结构

二叉堆是一种特殊的二叉树，有以下两个特性。

* 它是一棵完全二叉树，表示树的每一层都有左侧和右侧子节点(除了最后一层的叶节点)， 并且最后一层的叶节点尽可能都是左侧子节点，这叫作结构特性。
* 二叉堆不是最小堆就是最大堆。最小堆允许你快速导出树的最小值，最大堆允许你快速 导出树的最大值。所有的节点都大于等于(最大堆)或小于等于(最小堆)每个它的子 节点。这叫作堆特性。

![image-20210215223432828](https://pic4.zhimg.com/80/v2-b705ed69ada177394040255b05210235_720w.png)

通过上面的图可以大致的了解二叉堆的结构正确性。

## 10. 图

图是网络结构的抽象模型。图是一组由边链接的节点（或顶点）。学习图是重要的，因为任何二元关系都可以用图来表示。

任何社交网络，例如qq、微信、钉钉，都可以用图来表示。

我们还可以用图来表示道路、航班、通信等等。

## 11. 排序和搜索算法

学习最常用的排序和搜索算法。

### 冒泡排序

一般学习排序都会先学习冒泡排序，因为它在所有的排序算法中最简单。然而从运行角度来看，冒泡排序是最差的一个。

冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像冒泡，从底向上，因此得名。

```javascript
/**
 * 
 * @param {需要排序的数组} array 
 */
function bubbleSort(array) {
  const { length } = array
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (array[j] < array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array
}

let arr = [2, 1, 3, 4, 8, 7, 6]
console.log(bubbleSort(arr))  // [8, 7, 6, 4, 3, 2, 1]
```

冒泡排序算法的复杂度是O(n^2)

### 选择排序

选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值，并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。

```javascript
/**
 * 选择排序
 * @param {数组} array 
 */
function selectionSort(array) {
  const { length } = array
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i; // 假设第一个元素是最小的
    for (let j = i; j < length; j++) {
      if (array[j] < array[indexMin]) {
        indexMin = j
      }
    }
    [array[indexMin], array[i]] = [array[i], array[indexMin]]
  }
  return array
}

let arr = [2, 1, 3, 4, 8, 7, 6]
console.log(selectionSort(arr))
```

选择排序也是一个复杂度为O(n^2)，和冒泡排序一样，它包含有嵌套的两个循环，这导致了二次方的复杂度。

### 插入排序

插入排序每次排一个数组项，以此方式构建最后的排序数组。

```javascript
/**
 * 插入排序
 * @param {数组} array 
 */
function insertionSort(array) {
  const { length } = array
  let temp
  for (let i = 1; i < length; i++) {
    let j = i; // 当前元素下标
    temp = array[i] // 当前元素
    while (j > 0 && array[j - 1] > temp) {  // 待比较下标要大于0，因为从第1项开始比较的
      // 前置条件:待比较的元素大于当前元素
      array[j] = array[j - 1]  // 待比较元素向后移一位
      j--
    }
    array[j] = temp // 将当前元素插入预留空位
  }
  return array
}


let arr = [2, 1, 3, 4, 8, 7, 6]
console.log(insertionSort(arr))  // [1, 2, 3, 4, 6, 7, 8]
```

* 插入排序算法的运行并不需要额外的存储空间，所以空间复杂度是 O(1)，即属于原地排序。

* 时间复杂度

  最佳情况：T(n) = O(n)，当数据已经是正序时。
  最差情况：T(n) = O(n^2)，当数据是反序时。
  平均情况：T(n) = O(n^2)。

* 插入排序相比于选择排序和冒泡排序性能要好。

### 归并排序

归并排序是第一个可以实际使用的排序算法。其性能相对较好，复杂度为`O(nlog(n))`

> JavaScript 的 Array 类定义了一个 sort 函数(Array.prototype.sort)用以
>  排序 JavaScript 数组(我们不必自己实现这个算法)。ECMAScript 没有定义用哪 0 个排序算法，所以浏览器厂商可以自行去实现算法。例如，Mozilla Firefox 使用 归并排序作为 Array.prototype.sort 的实现，而 Chrome(V8 引擎)使用了 一个快速排序的变体。

```javascript

/**
 * 归并排序
 * @param {数组} array 
 */
function mergeSort(array) {
  if (array.length > 1) {
    const { length } = array
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle)) // 切片，取下标0到中间
    const right = mergeSort(array.slice(middle, length)) // 切片，取下标中间到最后
    array = merge(left, right)  // 左右排序
  }
  return array
}

function merge(left, right) {
  let j = 0;
  let i = 0;
  const result = []
  while (i < left.length && j < right.length) {
    console.log(left[i], right[j])  // 打印出来，就可以理解是如何进行排序的了
    result.push(left[i] < right[j] ? left[i++] : right[j++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

let arr = [2, 1, 3, 4, 8, 7, 6]
console.log(mergeSort(arr))
```

可以先看看这这个动态效果图，再来解读代码，更容易理解！[查看效果图](https://pic1.zhimg.com/v2-a29c0dd0186d1f8cef3c5ebdedf3e5a3_b.webp)

### 快速排序

快速排序也行是最常用的排序算法了。它的复杂度为`O(nlog(n))`，且性能通常比其他复杂度为`O(nlog(n))`的排序算法要好，和归并排序一样，快速排序也使用分而治之的方法，将原始数组分为较小的数组，但它没有像归并排序那样将它们分隔开。

```javascript

/**
 * 快速排序
 * @param {number} array 
 */
function quickSort(array) {
  return quick(array, 0, array.length - 1);
};

// 划分过程
function quick(arr, i, j) {
  if (i < j) {
    let left = i;
    let right = j;
    let pivot = arr[left];
    while (i < j) {
      while (arr[j] >= pivot && i < j) {  // 从后往前找比基准小的数
        j--;
      }
      // 执行交换
      if (i < j) {
        arr[i++] = arr[j];
      }
      while (arr[i] <= pivot && i < j) {  // 从前往后找比基准大的数
        i++;
      }
      // 执行交换
      if (i < j) {
        arr[j--] = arr[i];
      }
    }
		// 反复上面的循环
    arr[left] = pivot;
    quicklySort(arr, l, right - 1); // 左边分而治之
    quicklySort(arr, right + 1, r); // 右边分而治之
    return arr
  }
}

let arr = [2, 5, 3, 4, 1, 7, 6]
console.log(quickSort(arr))


```

看动态图：[快速排序](https://pic4.zhimg.com/v2-d4e5d0a778dba725091d8317e6bac939_b.webp)

### 计数排序

计数排序是学习的第一个分布式排序。分布式排序使用已组织好的辅助数据结构(称为桶)，然后进行合并，得到排好序的数组。计数排序使用一个用来存储每个元素在原始数组中出现次数的临时数组。在所有元素都计数完成后，临时数组已排好序并可迭代以构建排序 后的结果数组。

它是用来排序整数的优秀算法(它是一个整数排序算法)，时间复杂度为 `O(n+k)`，其中 k 是 临时计数数组的大小;但是，它确实需要更多的内存来存放临时数组。

```javascript
/**
 * 计数排序
 * @param {array} array
 */
function countingSort(array) {
  if (array.length < 2) {
    return arrayr
  }
  const maxValue = findMaxValue(array);

  const counts = new Array(maxValue + 1)
  array.forEach(e => {
    if (!counts[e]) {
      counts[e] = 0
    }
    counts[e]++
  });

  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  })
  return array
}

function findMaxValue(array) {
  let max = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  return max;
}

let arr = [100, 7, 40, 22, 2, 94]
console.log("计数排序", countingSort(arr))
```



### 桶排序

桶排序(也被称为箱排序)也是分布式排序算法，它将元素分为不同的桶(较小的数组)， 再使用一个简单的排序算法，例如插入排序(用来排序小数组的不错的算法)，来对每个桶进行 排序。然后，它将所有的桶合并为结果数组。

```javascript
/**
 * 桶排序
 * @param {array} array
 * @param {number} bucketSize
 */
function bucketSort(array, bucketSize = 5) { // {1}
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize); // {2}
  return sortBuckets(buckets); // {3}
}

// 创建桶
function createBuckets(array, bucketSize) {
  let minValue = array[0];
  let maxValue = array[0];
  for (let i = 1; i < array.length; i++) { // {4}
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // {5} 
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) { // {6}
    buckets[i] = [];
  }
  for (let i = 0; i < array.length; i++) { // {7}
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize); // {8} 
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

// 将每个桶排序
function sortBuckets(buckets) {
  const sortedArray = []; // {9}
  for (let i = 0; i < buckets.length; i++) { // {10}
    if (buckets[i] != null) {
      insertionSort(buckets[i]); // {11} 
      sortedArray.push(...buckets[i]); // {12}
    }
  } return sortedArray;
}

// 插入排序
function insertionSort(array) {
  const { length } = array; // {1}
  let temp;
  for (let i = 1; i < length; i++) { // {2}
    let j = i; // {3}
    temp = array[i]; // {4}
    while (j > 0 && array[j - 1] < temp) { // {5}
      array[j] = array[j - 1]; // {6}
      j--;
    }
    array[j] = temp; // {7}
  }
  return array;
};

let arr = [100, 7, 40, 22, 2, 94, 23, 45, 2, 45, 67, 76, 58]
console.log("桶排序排序", bucketSort(arr))
```

### 基数排序

基数排序也是一个分布式排序算法，它根据数字的有效位或基数(这也是它为什么叫基数排序)将整数分布到桶中。基数是基于数组中值的记数制的。比如，对于十进制数，使用的基数是 10。因此，算法将会使用 10 个桶用来分布元素并且首先基于个位数字进行排序，然后基于十位数字，然后基于百位数字，以此类推。

```javascript
/**
 * 基数排序
 * @param {array} array 
 * @param {number} radixBase 
 */
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array;
  }
  const minValue = findMinValue(array);

  const maxValue = findMaxValue(array);
  let significantDigit = 1; // {1}
  while ((maxValue - minValue) / significantDigit >= 1) { // {2}
    array = countingSortForRadix(array, radixBase, significantDigit, minValue); // {3}
    significantDigit *= radixBase; // {4}
  }
  return array;
}

// 基于有效位基数排序的代码
function countingSortForRadix(array, radixBase, significantDigit, minValue) {
  let bucketsIndex;
  const buckets = [];
  const aux = [];
  for (let i = 0; i < radixBase; i++) { // {5}
    buckets[i] = 0;
  }
  for (let i = 0; i < array.length; i++) { // {6}
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); // {7}
    buckets[bucketsIndex]++; // {8}
  }
  for (let i = 1; i < radixBase; i++) { // {9} 
    buckets[i] += buckets[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i--) { // {10}
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase); // {11}
    aux[--buckets[bucketsIndex]] = array[i]; // {12} 
  }
  for (let i = 0; i < array.length; i++) { // {13}
    array[i] = aux[i];
  }
  return array;
}

// 取最大值
function findMaxValue(array) {
  let max = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  return max;
}

// 取最小值
function findMinValue(array) {
  let min = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
  }
  return min;
}

let arr = [100, 7, 40, 22, 2, 94, 23, 45, 2, 45, 67, 76, 58]
console.log("基数排序", radixSort(arr))
```

## 12. 算法复杂度

加深理解大O表示法和NP完全理论。

### 大O表示法

| 符号          | 名称         |
| ------------- | ------------ |
| O(1)          | 常数的       |
| O(log(n))     | 对数的       |
| O((log(n)) c) | 对数多项式的 |
| O(n)          | 线性的       |
| O(n^2)        | 二次的       |
| O(n^c)        | 多项式的     |
| O(c^n)        | 指数的       |

### 理解大O表示法

如何衡量算法的效率?通常是用资源，例如 CPU(时间)占用、内存占用、硬盘占用和网络占用。当讨论大 O 表示法时，一般考虑的是 CPU(时间)占用。

**1. O(1)**

考虑以下函数。

```javascript
function increment(num){
   return ++num;
}
```

假设运行 increment(1)函数，执行时间等于 X。如果再用不同的参数(例如 2)运行一次 increment 函数，执行时间依然是 X。和参数无关，increment 函数的性能都一样。因此，我 们说上述函数的复杂度是 O(1)(常数)。

**2. O(n)**

以实现的顺序搜索算法为例。

```javascript
function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(value, array[i])) {
      return i;
    }
  }
  return -1;
}
```

如果将含 10 个元素的数组([1, ..., 10])传递给该函数，假如搜索 1 这个元素，那么， 第一次判断时就能找到想要搜索的元素。在这里我们假设每执行一次行{1}，开销是 1。

现在，假如要搜索元素 11。行{1}会执行 10 次(迭代数组中所有的值，并且找不到要搜索 的元素，因而结果返回-1)。如果行{1}的开销是 1，那么它执行 10 次的开销就是 10，10 倍于第 一种假设。

现在，假如该数组有 1000 个元素([1, ..., 1000])。搜索 1001 的结果是行{1}执行了 1000 次(然后返回-1)。

注意，sequentialSearch 函数执行的总开销取决于数组元素的个数(数组大小)，而且也 和搜索的值有关。如果是查找数组中存在的值，行{1}会执行几次呢?如果查找的是数组中不存 在的值，那么行{1}就会执行和数组大小一样多次，这就是通常所说的最坏情况。

最坏情况下，如果数组大小是 10，开销就是 10;如果数组大小是 1000，开销就是 1000。可 以得出 sequentialSearch 函数的时间复杂度是 O(n)，n 是(输入)数组的大小。

**3. O(n2)**

用冒泡排序做 O(n^2)的例子。

```javascript
/**
 * 
 * @param {需要排序的数组} array 
 */
function bubbleSort(array) {
  const { length } = array
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (array[j] < array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array
}

let arr = [2, 1, 3, 4, 8, 7, 6]
console.log(bubbleSort(arr))  // [8, 7, 6, 4, 3, 2, 1]
```

如果用大小为 10 的数组执行 bubbleSort，开销是 100(10^2)。如果用大小为 100 的数组执行 bubbleSort，开销就是 10 000(100^2)。需要注意，我们每次增加输入的大小，执行都会越来越久。

> 时间复杂度 O(n)的代码只有一层循环，而 O(n^2)的代码有双层嵌套循环。如果算 法有三层迭代数组的嵌套循环，它的时间复杂度很可能就是 O(n^3)。

### 时间复杂度比较

O(1) < O(log(n)) < O(n) < O(nlog(n)) < O(n^2) < O(2^n)

### 常用数据结构的时间复杂度。

![](https://pic1.zhimg.com/80/v2-0b2b02788a3f602117d32a8eb60e4c8c_1440w.png)

![](https://pic1.zhimg.com/80/v2-e5ecf49b461e21efb039211dab68866f_1440w.png)

![](https://pic2.zhimg.com/80/v2-4a733464e8e88cee66c31c2a1b322d82_1440w.png)

### NP 完全理论概述

一般来说，如果一个算法的复杂度为 O(nk)，其中 k 是常数，我们就认为这个算法是高效的，这就是多项式算法。

对于给定的问题，如果存在多项式算法，则计为 P(polynomial，多项式)。

还有一类 NP(nondeterministic polynomial，非确定性多项式)算法。如果一个问题可以在多 项式时间内验证解是否正确，则计为 NP。

如果一个问题存在多项式算法，自然可以在多项式时间内验证其解。因此，所有的 P 都是 NP。然而，P = NP 是否成立，仍然不得而知。

NP 问题中最难的是 NP 完全问题。如果满足以下两个条件，则称决策问题 L 是 NP 完全的: (1) L 是 NP 问题，也就是说，可以在多项式时间内验证解，但还没有找到多项式算法;

(2) 所有的 NP 问题都能在多项式时间内归约为 L。

为了理解问题的归约，考虑两个决策问题 L 和 M。假设算法 A 可以解决问题 L，算法 B 可以 验证输入 y 是否为 M 的解。目标是找到一个把 L 转化为 M 的方法，使得算法 B 可以用于构造算 法 A。

还有一类问题，只需满足 NP 完全问题的第二个条件，称为 NP 困难问题。因此，NP 完全问 题也是 NP 困难问题的子集。

> P = NP 是否成立，是计算机科学中最重要的难题之一。如果能找到答案，对密 码学、算法研究、人工智能等诸多领域都会产生重大影响。

