import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
    @Prop({ default: '' })
    title?: string;

    @Prop()
    image?: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
