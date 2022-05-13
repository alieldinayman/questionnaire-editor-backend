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
        const savedQuestionnaire: Questionnaire = await this.questionnaireModel
            .findOne({}, {}, { sort: { _id: -1 } })
            .exec();

        // If no questionnaire is already saved, return a new one with default values
        if (!savedQuestionnaire) {
            return new QuestionnaireDto();
        }

        return plainToClass(QuestionnaireDto, savedQuestionnaire);
    }

    async saveQuestionnaire(questionnaireDto: QuestionnaireDto): Promise<QuestionnaireDto> {
        // Check if a questionnaire is already saved
        let questionnaire: Questionnaire = await this.questionnaireModel.findOne({}, {}, { sort: { _id: -1 } }).exec();

        // If a questionnaire is saved, update its title and reset its elements; otherwise create a new one
        if (questionnaire) {
            questionnaire.title = questionnaireDto.title;
            await this.resetQuestionnaireElements(questionnaire);
        } else {
            questionnaire = new Questionnaire(questionnaireDto.title);
        }

        // Add the new questions and answers to the questionnaire
        for (const questionDto of questionnaireDto.questions) {
            const newQuestion = await this.questionModel.create(questionDto);
            questionnaire.questions.push(newQuestion);
        }

        for (const answerDto of questionnaireDto.answers) {
            const newAnswer = await this.answerModel.create(answerDto);
            questionnaire.answers.push(newAnswer);
        }

        // Save the questionnaire
        await this.questionnaireModel.create(questionnaire);
        return questionnaireDto;
    }

    private async resetQuestionnaireElements(questionnaire: Questionnaire): Promise<void> {
        await this.questionModel.deleteMany({ _id: { $in: questionnaire.questions } });
        await this.answerModel.deleteMany({ _id: { $in: questionnaire.answers } });
        questionnaire.questions = [];
        questionnaire.answers = [];
    }
}
