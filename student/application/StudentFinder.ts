import { StudentRepository } from '../domain/StudentRepository';

export default class StudentFinder {
  constructor(private repository: StudentRepository) {}

  findOne({ id }: { id: string }) {
    return this.repository.query({ id });
  }

  findMany() {
    return this.repository.search();
  }
}
