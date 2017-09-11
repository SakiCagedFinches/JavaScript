# CSS常用代码

### 1. 多行文本溢出省略号

* 单行显示，溢出以省略号表示 
 
``` css
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
```
* 显示两行文本，溢出部分省略

``` css
  line-height: 1.5rem;
  max-height: 3rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
```

### 2. 隐藏滚动条并可继续滚动
 
``` css
  ::webkit-scrollbar {
    width: 0;
    height: 0;
  }
```
### 3. 解决iPhone中overflow: scroll; 滑动速度慢或卡顿的问题

``` css
  -webkit-overflow-scrolling: touch;
```

