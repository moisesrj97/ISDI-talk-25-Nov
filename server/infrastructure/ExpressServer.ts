import express, { Express, Router } from 'express';

export type ExpressRouter = {
  router: Router;
};

export default class ExpressServer {
  constructor(
    private app: Express,
    private port: number,
    private routers: ExpressRouter[]
  ) {
    this.app = express();
    this.registerRouters();
  }

  registerRouters() {
    this.routers.forEach((router) => {
      this.app.use(router.router);
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
