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

    async fetchLatest(): Promise<QuestionnaireDto> {
        // Order by latest questionnaires in a descending fashion
        const savedQuestionnaire = await this.questionnaireModel.findOne({}, {}, { sort: { _id: -1 } }).exec();

        // If no questionnaire is already saved, return a new one with default values
        if (!savedQuestionnaire) {
            return new QuestionnaireDto();
        }

        return plainToClass(QuestionnaireDto, savedQuestionnaire);
    }

    async saveQuestionnaire(questionnaireDto: QuestionnaireDto): Promise<QuestionnaireDto> {
        const newQuestionnaire = new Questionnaire(questionnaireDto.title);

        for (const questionDto of questionnaireDto.questions) {
            const newQuestion = await this.questionModel.create(questionDto);
            newQuestionnaire.questions.push(newQuestion);
        }

        for (const answerDto of questionnaireDto.answers) {
            const newAnswer = await this.answerModel.create(answerDto);
            newQuestionnaire.answers.push(newAnswer);
        }

        await this.questionnaireModel.create(newQuestionnaire);
        return questionnaireDto;
    }
}
