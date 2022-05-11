import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AnswerDto {
    @Expose()
    title: string;

    @Expose()
    image?: Buffer;
}
