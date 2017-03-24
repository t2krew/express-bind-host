# express-bind-host
Bind the available  host to Express Server.


### Installation
```powershell
$ npm install express-bind-host --save
```

### Usage
```javascript
let bindHost = require('express-bind-host');

let app = express();

app.use(bindHost({
  hosts : ['127.0.0.1:3000']
}))
app.use(function(req, res, next) {
  res.json({aa:'bb'})
})

app.listen(3000);
```

```powershell
curl http://localhost:3000  #statu -> 403  body -> The domain name is not bound!
curl http://127.0.0.1:3000  #statu -> 200  body -> {aa:'bb'}
```

### License
MIT  © [Krew](https://github.com/t2krew)