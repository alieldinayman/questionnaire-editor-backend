import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireModule } from './models/questionnaire/questionnaire.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.local', '.env'],
        }),
        MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                connection.plugin(require('mongoose-autopopulate'));
                return connection;
            },
        }),
        QuestionnaireModule,
    ],
})
export class AppModule {}
