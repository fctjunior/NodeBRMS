import * as express from 'express'

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {

      var startTime = new Date().getTime();
      
      var person =  {
        name : 'tarcisio',
        idade : 29,
        id : 1
      };
      
      for(var i = 0; i < 1000000000; i++) {
        var prop = person["name"];
      }
      
      var endTime = new Date().getTime();
      var elapsedMS = (endTime - startTime);

      res.json({
        message: 'ElapsedTime: ' + elapsedMS + ' ms'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express