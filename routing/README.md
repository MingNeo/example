# Regularjs的单页范例


## 使用到的技术

- webpack + ES6:  你当然也可以替换为别的模块系统. 
- fetch:  用来处理异步请求
- puer:  前端开发服务器 ： 静态 + mock接口等


## 命令介绍

__在`/routing`根目录下__ 

如果npm 无法运行， 请配置为淘宝的源`https://registry.npm.taobao.org`, 或者直接使用[`cnpm`](http://cnpmjs.org/)代替`npm`


### `npm install` : 安装所有依赖(注意第一次安装可能时间较长)


### `npm start`

开启模拟服务器， 并且开启webpack. (启用了livereload)

### `npm run build`

build当前资源, 如果你启动的npm 