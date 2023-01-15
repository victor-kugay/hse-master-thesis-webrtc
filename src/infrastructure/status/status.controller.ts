import {Controller, Get} from '@nestjs/common';
import {StatusRespose} from './dto/status.dto';
import {StatusRoute} from './status.routes';

@Controller(StatusRoute.Root)
export class StatusController {
  @Get(StatusRoute.Status)
  public status(): StatusRespose {
    return {status: 'ok'};
  }
}
