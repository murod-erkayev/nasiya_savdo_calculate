import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3030
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe())
    app.setGlobalPrefix("api")
    await app.listen(PORT,()=>{
      console.log(`🚀 Server started at http://localhost:${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
