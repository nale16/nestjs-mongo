import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  time: Date;

  @Prop()
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
