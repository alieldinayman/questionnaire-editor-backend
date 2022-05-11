import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
    @Prop({ required: true })
    title: string;

    @Prop()
    image?: Buffer;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
