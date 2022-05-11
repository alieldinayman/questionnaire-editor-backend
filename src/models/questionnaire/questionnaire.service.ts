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

    async getLatest(): Promise<QuestionnaireDto> {
        const savedQuestionnaire = await this.questionnaireModel.findOne({}, {}, { sort: { _id: -1 } }).exec();

        if (!savedQuestionnaire) {
            return new QuestionnaireDto();
        }

        return plainToClass(QuestionnaireDto, savedQuestionnaire);
    }

    async save(questionnaireDto: QuestionnaireDto): Promise<QuestionnaireDto> {
        const savedQuestionnaire = new Questionnaire(questionnaireDto.title);

        for (const questionDto of questionnaireDto.questions) {
            const newQuestion = await this.questionModel.create(questionDto);
            savedQuestionnaire.questions.push(newQuestion);
        }

        for (const answerDto of questionnaireDto.answers) {
            const newAnswer = await this.answerModel.create(answerDto);
            savedQuestionnaire.answers.push(newAnswer);
        }

        await this.questionnaireModel.create(savedQuestionnaire);
        return questionnaireDto;
    }
}
