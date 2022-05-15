import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { Questionnaire, QuestionnaireSchema, Question, QuestionSchema, Answer, AnswerSchema } from './schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Questionnaire.name, schema: QuestionnaireSchema },
            { name: Question.name, schema: QuestionSchema },
            { name: Answer.name, schema: AnswerSchema },
        ]),
    ],
    providers: [QuestionnaireService],
    controllers: [QuestionnaireController],
})
export class QuestionnaireModule {}
