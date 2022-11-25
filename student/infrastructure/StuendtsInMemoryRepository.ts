import Student from '../domain/Student';
import { StudentRepository } from '../domain/StudentRepository';

export default class StudentsInMemoryRepository implements StudentRepository {
  private studentsArray: Student[] = [];

  async create(student: Student) {
    this.studentsArray = [...this.studentsArray, student];
  }

  async update(student: Partial<Student>) {
    this.studentsArray = this.studentsArray.map((s) => {
      if (s.id === student.id) {
        return {
          ...s,
          ...student,
        };
      }
      return s;
    });
  }

  async delete(id: string) {
    this.studentsArray = this.studentsArray.filter((s) => s.id !== id);
  }

  async search() {
    return Promise.resolve(this.studentsArray);
  }

  async query({ id }: { id: string }) {
    const result = this.studentsArray.find((s) => s.id === id);

    return Promise.resolve(result!);
  }
}
