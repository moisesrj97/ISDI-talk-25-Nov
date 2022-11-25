import ExpressServer from './server/infrastructure/ExpressServer';
import express from 'express';
import StudentRouter from './server/infrastructure/routers/StudentRouter';
import { StudentCreator } from './student/application/StudentCreator';
import StudentDestroyer from './student/application/StudentDestroyer';
import StudentFinder from './student/application/StudentFinder';
import { StudentUpdater } from './student/application/StudentUpdater';
import StudentsMongoRepository from './student/infrastructure/StudentsMongoRepository';
import StudentsInMemoryRepository from './student/infrastructure/StuendtsInMemoryRepository';

(async () => {
  // Repository
  /* const studentsRepository = new StudentsMongoRepository(); */
  const studentsRepository = new StudentsInMemoryRepository();

  // Use cases
  const studentCreator = new StudentCreator(studentsRepository);
  const studentUpdater = new StudentUpdater(studentsRepository);
  const studentFinder = new StudentFinder(studentsRepository);
  const studentDestroyer = new StudentDestroyer(studentsRepository);

  const app = express();

  const expressServer = new ExpressServer(app, 3000, [
    new StudentRouter(
      app,
      studentFinder,
      studentCreator,
      studentUpdater,
      studentDestroyer
    ),
  ]);

  expressServer.start();
})();
