import mongoose from 'mongoose';
import Student from '../domain/Student';
import { StudentRepository } from '../domain/StudentRepository';

export default class StudentsMongoRepository implements StudentRepository {
  connection!: typeof mongoose;

  schema: mongoose.Schema;
  model: mongoose.Model<any>;

  constructor() {
    this.connect();
    this.schema = new mongoose.Schema({
      _id: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      isWorking: {
        type: Boolean,
      },
    });
    this.model = mongoose.model('Student', this.schema);
  }

  async connect() {
    this.connection = await mongoose.connect(
      'mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT'
    );

    console.log('DB connected');
  }

  async create(student: Student): Promise<void> {
    await this.model.create({
      _id: new mongoose.Types.ObjectId(student.id),
      name: student.name,
      email: student.email,
      isWorking: student.isWorking,
    });
  }

  async update(student: Partial<Student>): Promise<void> {
    await this.model.findByIdAndUpdate(student.id, {
      ...student,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async query({ id }: { id: string }): Promise<Student> {
    const result = await this.model.findOne({
      ...(id ? { _id: id } : {}),
    });

    return new Student(result._id, result.name, result.email, result.isWorking);
  }

  async search(): Promise<Student[]> {
    const results = await this.model.find();

    return results.map(
      (model) =>
        new Student(model._id, model.name, model.email, model.isWorking)
    );
  }
}
