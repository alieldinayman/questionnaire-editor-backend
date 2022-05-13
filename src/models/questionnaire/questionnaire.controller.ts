import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionnaireDto } from './dto/questionnaire.dto';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
    constructor(private readonly questionnaireService: QuestionnaireService) {}

    @Get()
    fetchLatest(): Promise<QuestionnaireDto> {
        return this.questionnaireService.fetchLatest();
    }

    @Post()
    saveQuestionnaire(@Body() questionnaireDto: QuestionnaireDto): Promise<QuestionnaireDto> {
        return this.questionnaireService.saveQuestionnaire(questionnaireDto);
    }
}
