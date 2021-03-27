# JavaScript正则运算日常记录

JavaScript正则运算日常记录

## 获取括号里的内容

获取字符串内括号的内容

> 最里面的大括号 `[^\)]`表示不为 `)`的情况一直向后匹配1到多个字符内容
>
> 最终以 `)`结尾

```javascript
const txt = `translateY(15px);`
const reg = new RegExp(/translateY\(([^\)]+)\)/)
const data = txt.match(reg)[1]
console.log(data) // 15px
```

## 千分位

输入数字，进行千分位间隔，如1234，结果为123,4。

表示以1到3位数字开头，后面是3位数字为一组的数字结尾。

```javascript
const tho = "123456789"
const result = tho.replace(/(\d{1,3})(?=(\d{3})+$)/g, "$&,")
console.log(result)  // 123,456,789
```

## font-size转换为驼峰式

一缸的链接字符转换为驼峰式

```javascript
const upFont = "border-bottom-width".replace(/-(\w)/g, (a, b) => {
  console.log(a, b) // -b b  -w w
  return b.toUpperCase()
})

console.log(upFont)  // borderBottomWidth
```

## 获取URL路径参数

需要将`foo=1&foo=2&blah=a&blah=b&foo=3`

转化为`foo=1,2,3&blah=a,b"`

```javascript
function compress(source) {
  const keys = {};
  source.replace(
    /([^=&]+)=([^&]*)/g,
    function (full, key, value) {
      keys[key] = (keys[key] ? keys[key] + "," : "") + value; 
      return "";
    }
  );
  
  // 这里已经获取到内容了
  console.log(keys)  // { foo: '1,2,3', blah: 'a,b' }
  
  const result = [];
  for (let key in keys) {
    result.push(key + "=" + keys[key]);
  }
  return result.join("&");
}

compress('foo=1&foo=2&blah=a&blah=b&foo=3') // foo=1,2,3&blah=a,b
```

