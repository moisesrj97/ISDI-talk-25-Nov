import Student from './Student';

export interface StudentRepository {
  search: () => Promise<Student[]>;
  query: ({ id }: { id: string }) => Promise<Student>;
  create: (student: Student) => Promise<void>;
  update: (payload: Partial<Student>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
