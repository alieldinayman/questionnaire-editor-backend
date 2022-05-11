import { Body, Controller, Get, Post } from '@nestjs/common';

import { QuestionnaireDto } from './dto/questionnaire.dto';
import { QuestionnaireService } from './questionnaire.service';

@Controller('questionnaire')
export class QuestionnaireController {
    constructor(private readonly questionnaireService: QuestionnaireService) {}

    @Get()
    getFirst() {
        return this.questionnaireService.findFirst();
    }

    @Post()
    saveQuestionnaire(@Body() questionnaireDto: QuestionnaireDto) {
        return this.questionnaireService.save(questionnaireDto);
    }
}