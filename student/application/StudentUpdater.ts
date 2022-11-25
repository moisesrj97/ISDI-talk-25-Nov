import Student from '../domain/Student';
import { StudentRepository } from '../domain/StudentRepository';

export class StudentUpdater {
  constructor(private repository: StudentRepository) {}

  async update(student: Partial<Student>) {
    this.repository.update(student);
  }
}
