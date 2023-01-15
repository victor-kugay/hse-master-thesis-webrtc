import {ApiProperty} from '@nestjs/swagger';

export class StatusRespose {
  @ApiProperty()
  status!: 'ok';
}
