This boilerplate is made after completing ReactTimer App and it includes test modules (karma, mocha)

### Clip 87
  - how to create list of todos?
  > this is common pattern that can be used to create list of notes, list of products....

### Clip 138
> Optimize webpack on production site

- use node env object to detect which enviroment where application is running: NODE_ENV
- source map also takes a lot of space in bundle.js

```javascript
  devtool: process.env.NODE_ENV === 'production' ? undefinded : '#inline-source-map'
  //giảm dung lượng file bundle.js generated ra bởi webpack
```

- có thể giả lập chạy ở môi trường production bằng cách gõ lệnh sau ở terminal:
```javascript
  NODE_ENV=production webpack (run webpack -> bundle.js: từ 6.12MB còn 2.4MB)
```

```javascript
  NODE_ENV=production webpack -p //chạy lâu hơn nhưng có nhiều internal optimization hơn giúp file bundle.js nhỏ hơn (bundle.js từ 2.4MB còn 1.25MB nhưng có nhiều warnings)
  // -> dùng pluging: webpack.optimize.UglifyJsPlugin -> còn 1.25MB
```
