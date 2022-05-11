import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { Answer, AnswerDocument } from './schemas/answer.schema';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Questionnaire, QuestionnaireDocument } from './schemas/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
    constructor(
        @InjectModel(Questionnaire.name) private questionnaireModel: Model<QuestionnaireDocument>,
        @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
        @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>
    ) {}

    async findFirst(): Promise<QuestionnaireDto> {
        return plainToClass(
            QuestionnaireDto,
            await this.questionnaireModel.findOne({}, {}, { sort: { _id: -1 } }).exec()
        );
    }

    async save(questionnaireDto: QuestionnaireDto): Promise<QuestionnaireDto> {
        const questionnaire = new Questionnaire(questionnaireDto.title);

        for (const questionDto of questionnaireDto.questions) {
            const newQuestion = await this.questionModel.create(questionDto);
            questionnaire.questions.push(newQuestion);
        }

        for (const answerDto of questionnaireDto.answers) {
            const newAnswer = await this.answerModel.create(answerDto);
            questionnaire.answers.push(newAnswer);
        }

        await this.questionnaireModel.create(questionnaire);
        return questionnaireDto;
    }
}
