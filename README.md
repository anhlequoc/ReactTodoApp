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

- add domain to firebase: để firebase cho phép database connection to doamin này
> desolate-ridge-60364.herokuapp.com

### Clip 139 - Create your own environment variable
(for storing database information)
- use new module: node-env-file
- cần tạo 2 database mới ở firebase
- Copy thông tin 2 database này vào các file môi trường tương ứng ở folder configure
- edit webpack.config.js:
```javascript
//Thêm
  try {
  	envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
  } catch (e) {

  }

//Thêm plugin
new webpack.DefinePlugin({
  'process.env':{
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    API_KEY: JSON.stringify(process.env.API_KEY),
    AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
    DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
    PROJECT_ID: JSON.stringify(process.env.NODE_ENV),
    STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
    MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
  }
})
```

- setup đc như vậy thì khi chạy script (quy định trong package.json) sẽ trỏ vào các database khác nhau:
  npm test -> vào database khác
  webpack -> vào database khác

- chú ý: đoạn scripts trong package.JSON
```javascript
  "scripts": {
    "test": "SET NODE_ENV=test&&karma start",
    "build": "webpack",
    "start": "npm run build && node server.js"
  },
```
test: cần viết liền để tránh bị tự động add thêm khoảng trắng. Nếu viết: SET NODE_ENV=test && karma start -> path sẽ là: config/test .env -> không tìm thấy

### Clip 140 - add Heroku to firebase
Cần configure Heroku (vì lúc này file trong folder config sẽ ko được gửi lên)
command: heroku config: set ...; chạy ở terminal

### Clip 145 - firebase security rules
  ```javascript
    {
      "rules": {
        "users": {
          "$user_id": {
            ".read": "$user_id === auth.id", //nếu user_id trùng với auth.id thì được quyền read
            ".write": "$user_id === auth.id" //tương tự ở trên
          }
        }
      }
    }
  ```
  - sửa lại cấu trúc firebase db để theo dạng trên: users > user_id > todos > todo_id

### Clip 146 - testing with authentication
  - cho test db, dùng personal access tokens từ github
