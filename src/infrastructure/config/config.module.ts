import {Module} from '@nestjs/common';
import {ConfigModule as ConfigModuleNest} from '@nestjs/config';
import {ConfigService} from './config.service';

@Module({
  imports: [ConfigModuleNest.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
