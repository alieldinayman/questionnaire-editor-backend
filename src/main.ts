import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    // Increase the request size limit to 60mb
    app.use(json({ limit: '60mb' }));
    app.use(urlencoded({ extended: true, limit: '60mb' }));

    await app.listen(process.env.PORT || 3001);
}
bootstrap();
