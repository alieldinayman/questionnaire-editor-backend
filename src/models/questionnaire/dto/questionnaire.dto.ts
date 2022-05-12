import { Exclude, Expose, Type } from 'class-transformer';
import { AnswerDto } from './answer.dto';
import { QuestionDto } from './question.dto';

@Exclude()
export class QuestionnaireDto {
    @Expose()
    title = '';

    @Expose()
    @Type(() => QuestionDto)
    questions: QuestionDto[] = [new QuestionDto()];

    @Expose()
    @Type(() => AnswerDto)
    answers: AnswerDto[] = [new AnswerDto()];
}
