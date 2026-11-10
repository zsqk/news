# JS的幾個常用方法

### all
如果數組所有元素滿足函數條件，則返回true。調用時，如果省略第二個參數，則默認傳遞布爾值。
```
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```

### allEqual
判斷數組中的元素是否都相等
```
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```

### currentURL
返回當前訪問的 URL 地址。
```
const currentURL = () => window.location.href;

currentURL(); 
```

### decapitalize
將字符串的首字母轉換成小寫字母
```
const decapitalize = ([first, ...rest]) =>
  first.toLowerCase() + rest.join('')

decapitalize('Zsqk'); // 'zsqk'
```
