import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from './question.schema';
import { Answer } from './answer.schema';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Questionnaire {
    constructor(title: string) {
        this.title = title;
        this.questions = [];
        this.answers = [];
    }

    @Prop()
    title?: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], autopopulate: true })
    questions: Question[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }], autopopulate: true })
    answers: Answer[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
