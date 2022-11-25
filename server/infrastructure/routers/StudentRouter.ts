import { Router, Express, Request, Response } from 'express';
import { StudentCreator } from '../../../student/application/StudentCreator';
import StudentDestroyer from '../../../student/application/StudentDestroyer';
import StudentFinder from '../../../student/application/StudentFinder';
import { StudentUpdater } from '../../../student/application/StudentUpdater';
import { ExpressRouter } from '../ExpressServer';

export default class StudentRouter implements ExpressRouter {
  router: Router;

  constructor(
    public app: Express,
    public studentFinder: StudentFinder,
    public studentCreator: StudentCreator,
    public studentUpdater: StudentUpdater,
    public studentDestroyer: StudentDestroyer
  ) {
    this.router = Router();
    this.configureRoutes();
    console.log('StudentRouter listening on /student');
  }

  configureRoutes() {
    this.app.get('/student', async (req: Request, res: Response) => {
      const result = await this.studentFinder.findMany();
      res.status(200).json(result);
    });
    this.app.get('/student/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await this.studentFinder.findOne({
        id,
      });
      res.status(200).json(result);
    });
    this.app.post('/student', async (req: Request, res: Response) => {
      const student = req.body;
      await this.studentCreator.create(student);

      res.sendStatus(201);
    });
    this.app.put('/student/:id', async (req: Request, res: Response) => {
      const partial = req.body;
      const { id } = req.params;

      await this.studentUpdater.update({
        ...partial,
        id,
      });

      res.sendStatus(201);
    });
    this.app.delete('/student/:id', async (req: Request, res: Response) => {
      const { id } = req.params;

      await this.studentDestroyer.destroy(id);

      res.sendStatus(204);
    });
  }
}
