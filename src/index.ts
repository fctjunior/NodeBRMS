import * as express from 'express'
import * as bodyParser from 'body-parser'
import Routes from './controllers/routes'

const port = process.env.PORT || 1337;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Routes.mountRoutes(express.Router()));

app.listen(port, (err) => {
  if (err)
    return console.log(err);

  return console.log(`server is listening on ${port}`)
})

const redis = require('redis')
const client = redis.createClient(6379, '')
client.on("error", function(err) {
  console.log("Error " + err);
})

client.set('key1','teste', function() {
  console.log('ok');
});

client.get("key1",function(err, val) {
  console.log(val);
});

var myobj = { name : 'tarcisio', id : 1337 };
client.set('key2',JSON.stringify(myobj), function() {
  console.log('ok');
});

client.get("key2",function(err, val) {
  console.log(JSON.parse(val));
});

