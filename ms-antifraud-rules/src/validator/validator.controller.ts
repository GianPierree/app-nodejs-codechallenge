import { Controller } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { EventPattern } from '@nestjs/microservices';
import { ValidatorDto } from './dto/validator.dto';

@Controller('validator')
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}

  @EventPattern('transaction-created')
  handleTransactionCreated(message: ValidatorDto) {
    this.validatorService.validateTransaction(message);
  }
}
