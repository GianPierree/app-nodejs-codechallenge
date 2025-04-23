import { Controller } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('validator')
export class ValidatorController {
  constructor(private readonly validatorService: ValidatorService) {}

  @EventPattern('transaction-created')
  handleTransactionCreated(message: any) {
    this.validatorService.validateTransaction(message);
  }
}
