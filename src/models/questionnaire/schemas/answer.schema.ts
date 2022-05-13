import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
    @Prop({ default: '' })
    title?: string;

    @Prop()
    image?: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
