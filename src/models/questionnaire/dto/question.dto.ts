import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class QuestionDto {
    @Expose()
    title: string;

    @Expose()
    image?: Buffer;
}
