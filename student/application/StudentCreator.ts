import Student from '../domain/Student';
import { StudentRepository } from '../domain/StudentRepository';

export class StudentCreator {
  constructor(private repository: StudentRepository) {}

  async create(student: Student) {
    await this.repository.create(student);
  }
}
