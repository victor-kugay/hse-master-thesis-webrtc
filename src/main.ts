import {ConfigService} from './infrastructure/config/config.service';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {description, version, name} from '../package.json';
import {Logger as LoggerPino} from 'nestjs-pino';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import helmet from 'helmet';
import path from 'path';

class Bootstrapper {
  private static nestApplication: INestApplication;

  public static async init() {
    try {
      await Bootstrapper.createNestApplication();
      Bootstrapper.initStatic();
      // Bootstrapper.initHelmet();
      Bootstrapper.initValidation();
      Bootstrapper.initLogger();
      Bootstrapper.initSwagger();
      await Bootstrapper.listen();
      Bootstrapper.handleStart();
    } catch (error) {
      Bootstrapper.handleFail(error);
    }
  }

  private static async createNestApplication(): Promise<void> {
    if (!Bootstrapper.nestApplication) {
      Bootstrapper.nestApplication = await NestFactory.create(AppModule, {
        bufferLogs: true,
        abortOnError: false,
        cors: true,
      });
    }
  }

  private static async listen(): Promise<void> {
    const configService = Bootstrapper.nestApplication.get(ConfigService);
    await Bootstrapper.nestApplication.listen(configService.getPort());
  }

  private static initHelmet(): void {
    Bootstrapper.nestApplication.use(helmet());
  }

  private static initStatic(): void {
    const configService = Bootstrapper.nestApplication.get(ConfigService);
    Bootstrapper.nestApplication.setGlobalPrefix(configService.getApiPrefix());
  }

  private static initLogger(): void {
    const logger = Bootstrapper.nestApplication.get(LoggerPino);
    Bootstrapper.nestApplication.useLogger(logger);
  }

  private static initValidation(): void {
    Bootstrapper.nestApplication.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
  }

  private static initSwagger() {
    const swaggerDocOptions = new DocumentBuilder()
      .setDescription(description)
      .setVersion(version)
      .setTitle(name)
      .build();

    const swaggerDoc = SwaggerModule.createDocument(
      Bootstrapper.nestApplication,
      swaggerDocOptions,
    );
    const configService = Bootstrapper.nestApplication.get(ConfigService);
    const swaggerPath = path.join(
      configService.getApiPrefix(),
      configService.getSwagger(),
    );
    SwaggerModule.setup(swaggerPath, Bootstrapper.nestApplication, swaggerDoc, {
      customSiteTitle: `Swagger — ${name}`,
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        persistAuthorization: true,
        syntaxHighlight: {theme: 'nord'},
      },
    });
  }

  private static handleStart(): void {
    const configService = Bootstrapper.nestApplication.get(ConfigService);
    const logger = Bootstrapper.nestApplication.get(LoggerPino);
    logger.log(`Application is running on: ${configService.getPort()}`);
  }

  private static handleFail(error: unknown): void {
    const logger = Bootstrapper.nestApplication.get(LoggerPino);
    logger.error(error);
  }
}

Bootstrapper.init();
