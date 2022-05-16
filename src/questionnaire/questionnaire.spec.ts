import { Test } from '@nestjs/testing';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { getModelToken } from '@nestjs/mongoose';

describe('QuestionnaireController', () => {
    let questionnaireController: QuestionnaireController;
    let questionniareModel;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                QuestionnaireService,
                {
                    provide: getModelToken('Questionnaire'),
                    useValue: {
                        findOne: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('Question'),
                    useValue: {
                        create: jest.fn(),
                        deleteMany: jest.fn(),
                    },
                },
                {
                    provide: getModelToken('Answer'),
                    useValue: {
                        create: jest.fn(),
                        deleteMany: jest.fn(),
                    },
                },
            ],
            controllers: [QuestionnaireController],
        }).compile();

        questionnaireController = await moduleRef.resolve(QuestionnaireController);
        questionniareModel = await moduleRef.resolve(getModelToken('Questionnaire'));
    });

    describe('getQuestionnaire', () => {
        it('should return the latest questionnaire', async () => {
            // Arrange
            const mockQuestionnaireDto: QuestionnaireDto = {
                title: 'questionnaire with questions and answers',
                questions: [
                    {
                        title: 'question 1',
                    },
                ],
                answers: [
                    {
                        title: 'answer 1',
                    },
                ],
            };

            questionniareModel.findOne.mockReturnValue(mockQuestionnaireDto);

            // Act
            const result = await questionnaireController.getQuestionnaire();

            // Assert
            expect(result).toEqual(mockQuestionnaireDto);
        });
    });

    describe('saveQuestionnaire', () => {
        it('should throw error when questionnaire has no questions or answers', async () => {
            // Arrange
            const mockQuestionnaire: QuestionnaireDto = {
                title: 'questionnaire with no questions or answers',
                questions: [],
                answers: [],
            };

            // Act
            const resultPromise = questionnaireController.saveQuestionnaire(mockQuestionnaire);

            // Assert
            await expect(resultPromise).rejects.toThrow();
        });

        it('should save and return new questionnaire if none already exist', async () => {
            // Arrange
            const mockQuestionnaireDto: QuestionnaireDto = {
                title: 'questionnaire with questions and answers',
                questions: [
                    {
                        title: 'question 1',
                    },
                ],
                answers: [
                    {
                        title: 'answer 1',
                    },
                ],
            };

            jest.spyOn(questionniareModel, 'findOne').mockReturnValue(Promise.resolve(null));

            // Act
            const result = await questionnaireController.saveQuestionnaire(mockQuestionnaireDto);

            // Assert
            expect(questionniareModel.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockQuestionnaireDto);
        });

        it('should update and return questionnaire if it already exists', async () => {
            // Arrange
            const mockQuestionnaireDto: QuestionnaireDto = {
                title: 'new questionnaire',
                questions: [
                    {
                        title: 'question 1',
                    },
                    {
                        title: 'question 2',
                    },
                ],
                answers: [
                    {
                        title: 'answer',
                    },
                ],
            };

            const mockQuestionnaireModel = {
                title: 'existing questionnaire',
                questions: [
                    {
                        title: 'question',
                    },
                ],
                answers: [
                    {
                        title: 'answer',
                    },
                ],
            };

            jest.spyOn(questionniareModel, 'findOne').mockReturnValue(Promise.resolve(mockQuestionnaireModel));

            // Assert
            const resultPromise = questionnaireController.saveQuestionnaire(mockQuestionnaireDto);

            // Assert
            await expect(resultPromise).resolves.toEqual(mockQuestionnaireDto);
        });
    });
});
