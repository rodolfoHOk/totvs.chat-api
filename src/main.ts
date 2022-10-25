import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat/chat.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ChatModule);

  const documentConfig = new DocumentBuilder()
    .setTitle('Chat API')
    .setDescription('Totvs Twitch Live Code!')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('swagger-ui', app, document);

  await app.listen(3000);
}
bootstrap();
