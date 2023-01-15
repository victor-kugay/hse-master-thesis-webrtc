import {Injectable} from '@nestjs/common';
import {ConfigService as ConfigServiceNest} from '@nestjs/config';
import {APP_API_PORT, APP_API_PREFIX, APP_API_SWAGGER} from './config.constants';

@Injectable()
export class ConfigService {
  constructor(private readonly configServiceNest: ConfigServiceNest) {}

  public getPort(): string {
    return this.configServiceNest.getOrThrow(APP_API_PORT);
  }

  public getApiPrefix(): string {
    return this.configServiceNest.getOrThrow(APP_API_PREFIX);
  }

  public getSwagger(): string {
    return this.configServiceNest.getOrThrow(APP_API_SWAGGER);
  }
}
