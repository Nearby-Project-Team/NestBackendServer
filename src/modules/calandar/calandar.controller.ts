import { Controller } from '@nestjs/common';
import { CalandarService } from './calandar.service';

@Controller('calandar')
export class CalandarController {
  constructor(private readonly calandarService: CalandarService) {}
}
