import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { TransactionService } from './transaction.service.js';
import { UpdateTransactionEvent } from './dto/update-transaction-event.js';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  
  @EventPattern('transaction-validated')
  handleTransactionValidated(message: UpdateTransactionEvent) {
    const { transactionExternalId, status } = message;
    this.transactionService.updateStatus(transactionExternalId, status);
  }
}
