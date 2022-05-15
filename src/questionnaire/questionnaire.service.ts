import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Questionnaire, QuestionnaireDocument, Question, QuestionDocument, Answer, AnswerDocument } from './schemas';
import { QuestionnaireDto } from './dto/questionnaire.dto';

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
        // Validate the questionnaire has at least one question and one answer
        if (!this.validateQuestionnaireHasElements(questionnaireDto)) {
            throw new BadRequestException('Questionnaire must have at least one question and one answer');
        }

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

    private validateQuestionnaireHasElements(questionnaire: Questionnaire): boolean {
        return questionnaire.questions.length >= 1 && questionnaire.answers.length >= 1;
    }

    private async resetQuestionnaireElements(questionnaire: Questionnaire): Promise<void> {
        await this.questionModel.deleteMany({ _id: { $in: questionnaire.questions } });
        await this.answerModel.deleteMany({ _id: { $in: questionnaire.answers } });
        questionnaire.questions = [];
        questionnaire.answers = [];
    }
}
