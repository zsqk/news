# JS的几个常用方法

### all
如果数组所有元素满足函数条件，则返回true。调用时，如果省略第二个参数，则默认传递布尔值。
```
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

### allEqual
判断数组中的元素是否都相等
```
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

### currentURL
返回当前访问的 URL 地址。
```
const currentURL = () => window.location.href;

currentURL(); 
```

### decapitalize
将字符串的首字母转换成小写字母
```
const decapitalize = ([first, ...rest]) =>
  first.toLowerCase() + rest.join('')

decapitalize('Zsqk'); // 'zsqk'
```
