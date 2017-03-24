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

app.listen(3000);
```

```powershell
curl http://localhost:3000  #statu -> 403  body -> The domain name is not bound!
```

###License
MIT  © [Krew](https://github.com/t2krew)