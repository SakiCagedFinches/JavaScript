# JavaScript代码片段

## 字符串相关

### 字符串重复

&emsp;&emsp;可通过传入长度重复输出当前字符串。ES6中已实现该方法。
* 通过ES5实现
```
  String.prototype.repeat = function (len) {
    var str = this.toString();
    var res = '';
    if (isNaN(Number(len)))	{
      throw new Error('error arguments params is not Number');
      return ;
    }
    for (let i = 0; i < len; i++) {
      res += str;
    }
    return res;
  }
  
```
### 字符串补全

#### 1.补全头部
```
  String.prototype.padStart = function (len, str) {
    let temp = this.toString();
    let res = '';
    str = JSON.stringify(str);
    if (isNaN(Number(len)))	{
      throw new Error('error arguments params is not Number');
    }
    if (temp.length >= len) {
      return temp;
    }
    let len2 = len - temp.length;
    
    if (str.length < len2) {
      while (str.length < len2) {
        str += str;
      }
    }
    str = str.substring(0, len2);
    res = str + temp;
    return res;
  }
```

#### 2.补全尾部

```
  String.prototype.padStart = function (len, str) {
    let temp = this.toString();
    let res = '';
    str = JSON.stringify(str);
    if (isNaN(Number(len)))	{
      throw new Error('error arguments params is not Number');
    }
    if (temp.length >= len) {
      return temp;
    }
    let len2 = len - temp.length;
    if (str.length < len2) {
      while (str.length < len2) {
        str += str;
      }
    }
    str = str.substring(0, len2);
    res = temp + str;
    return res;
  }
```

-----------------------------------

## 对象数组相关

### 深浅拷贝

#### 1.通过JSON对象

&emsp;&emsp;通过JSON对象的stringify以及parse方法转换，首先将对象通过SON.stringify转换为字符串。然后，通过JSON.parse方法转换回对象。这个方法有个缺点就是无法拷贝函数，因为函数在转换中会被转换为<code>[Object object]</code>。

&emsp;&emsp;实现方法如下：

```
  var example = JSON.parse(JSON.stringify(data));
```

#### 2.通过递归函数实现

&emsp;&emsp;这个方法的本质是通过判断验证数据中每一条属性是否还能继续往下找来实现。当该属性类型为对象或者数组时递归调用该方法继续查找，直到子属性没有对象或者数组类型时结束并返回结果。

&emsp;&emsp;实现方法如下：

```
  function deepClone (source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'shallowClone');
    }
    var targetObj = source.constructor === Array ? [] : {};
    for (var keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = Array.isArray(source[keys]) ? [] : {};
          targetObj[keys] = deepClone(source[keys]);    //递归
        } else {
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
  }
```

### 数组去重方法

#### 1.通过新数组去重

&emsp;&emsp;定义一个新数组，并存放原数组的第一个元素，然后将元素组一一和新数组的元素对比，若不同则存放在新数组中。

```
  function unique(arr){
　　var res = [arr[0]];
　　for (var i = 1, len1 = arr.length; i < len1; i++) {
　　　var repeat = false;
　　　for (var j = 0, len2 = res.length; j < len2; j++) {
　　　 if (arr[i] == res[j]) {
　　　　　repeat = true;
　　　　　break;
　　　　}
　　  }
　　　if (!repeat) {
　　　　res.push(arr[i]);
　　　}
　　}
　　return res;
  }
```

#### 2.排序后去重

&emsp;&emsp;先将原数组排序，在与相邻的进行比较，如果不同则存入新数组。

```
  function unique(arr){
    var arr2 = arr.sort((a, b) => { return b - a; });
    var res = [arr[0]]
　　for (var i = 1, len1 = arr2.length; i < len1; i++) {
      if (arr[i] !== res[len1 - 1]) {
        res.push(arr2[i])
      }
　　}
　　return res;
  }
```

#### 3.通过对象去重(推荐方法)

&emsp;&emsp;每次取出原数组的元素，然后再对象中访问这个属性，如果存在就说明重复。

```
  function unique (arr) {
　　var res = [];
    var josn = {}
　　for (var i = 0, len1 = arr.length; i < len1; i++) {
　　　var repeat = false;
　　　for (var j = 0, len2 = res.length; j < len2; j++) {
　　　 if (arr[i] == res[j]) {
　　　　　repeat = true;
　　　　　break;
　　　　}
　　  }
　　　if (!repeat) {
　　　　res.push(arr[i]);
　　　}
　　}
　　return res;
  }
```

#### 4.通过ES6的Set方法去重

* 通过扩展算符 rest参数
```
  function unique (arr) {
    return [...new Set(arr)];
  }
```
* 通过Array对象方法
```
  function unique (arr) {
    return Array.from(new Set(arr));
  }
```

-----------------------------------

## 工具函数

### 十六进制色转换为rgb方法

```
  function getRgb (str) {
    var reg = new RegExp(/^#[0-9a-zA-Z]{6}$/);
    // 验证参数是否为有效值
    if (!reg.test(str)) {
      throw new Error('error arguments', 'Invalid value');
      return;
    }
    var num = parseInt(str.slice(1), 16);
    var b = num % 256;
    num = parseInt(num / 256);
    var g = num % 256;
    num = parseInt(num / 256);
    var r = num % 256;
    num = parseInt(num / 256);
    return `rgb(${r},${g},${b})`;
  }
```

### 判断是否为移动端

```
  function isMobile () {
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
  }
```

### 序列化时间对象

```
  function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
```

### 压缩保存图片到本地

&emsp;&emsp;通过FileReader对象拿到图片的base64数据，然后设置为图片的src接着去监听图片的加载完成，加载完成之后获取图片实际高度和宽度设置为canvas容器的大小。最后通过canvas的toDataURL方法将canvas转换为base64。压缩的实现主要是通过toDataURL 的第二个参数，取值范围是0~1超出范围以0.962位默认值。

&emsp;&emsp;这个方法有个缺点就是只能将图片压缩为jpg格式且压缩比例为0.5以下时失真非常严重。[查看JS文件](./minifyImg.js)

&emsp;&emsp;核心代码如下：

```
  // 获取到file之后
  let  reader = new FileReader();
  
  // 通过fileReader获取图片为base64格式
  reader.readAsDataURL(file);
  
  reader.onload = function (e) {
    // 创建img
    let img = document.createElement('img');

    // 将fileReader获取到的base64设置为图片路径
    img.src = e.srcElement.result;

    img.onload = function () {
      // 获取图片大小
      let w = img.width,
          h = img.height;

      // 计算图片宽高比
      let proportion =  h / w;

      // 如需限制最大分辨率
      if (w > maxW) {
        w = maxW;
        h = w * proportion;
      }
      if (h > maxH) {
        h = maxH;
        w = h / proportion;
      }

      // 设置图片大小为canvas画布大小
      canvas.style.width = w;
      canvas.style.height = h;

      // 绘制图片
      ctx.drawImage(img, 0, 0, w, h);

      // 获取压缩后base64(如需要压缩则第一个参数只能为image/jpeg)
      let miniUrl = canvas.toDataURL('image/jpeg', minify);
    }
  }
```
