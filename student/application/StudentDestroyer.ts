import { StudentRepository } from '../domain/StudentRepository';

export default class StudentDestroyer {
  constructor(private repository: StudentRepository) {}

  async destroy(id: string) {
    await this.repository.delete(id);
  }
}
