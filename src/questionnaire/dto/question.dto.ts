import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class QuestionDto {
    @Expose()
    title = '';

    @Expose()
    image?: string;
}
