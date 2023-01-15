import {Module} from '@nestjs/common';
import {DomainModule} from './domain';
import {InfrastructureModule} from './infrastructure';

@Module({
  imports: [InfrastructureModule, DomainModule],
})
export class AppModule {}
