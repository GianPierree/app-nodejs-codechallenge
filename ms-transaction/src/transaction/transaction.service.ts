import { Transaction } from './entities/transaction.entity.js';
import { CreateTransactionInput } from './dto/create-transaction.input.js';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @Inject('ANTIFRAUD_RULES_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}
  
  async create(createTransactionInput: CreateTransactionInput): Promise<Transaction> {
    const transaction = this.transactionRepository.create(createTransactionInput);
    const result = await this.transactionRepository.save(transaction);

    if (result) {
      this.kafkaClient.emit('transaction-created', JSON.stringify({
        transactionExternalId: result.transactionExternalId,
        value: result.value,
      }));
    }

    return result;
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionExternalId: id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transacción '${id}' no encontrada`);
    }

    return transaction;
  }

  async updateStatus(id: string, status: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionExternalId: id },
    });

    if (!transaction) {
      throw new NotFoundException(`Transacción '${id}' no encontrada`);
    }

    transaction.transactionStatus = status;
    return this.transactionRepository.save(transaction);
  }
}
