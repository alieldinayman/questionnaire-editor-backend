import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AnswerDocument = Answer & Document;

@Schema()
export class Answer {
    @Prop({ required: true })
    title: string;

    @Prop()
    image?: Buffer;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
