import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AnswerDto {
    @Expose()
    title = '';

    @Expose()
    image?: string;
}
