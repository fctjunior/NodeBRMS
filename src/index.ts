import * as express from 'express'
import * as bodyParser from 'body-parser'
import Routes from './routes'

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