import { Transaction } from './entities/transaction.entity.js';
import { TransactionService } from './transaction.service.js';
import { TransactionResolver } from './transaction.resolver.js';
import { TransactionController } from './transaction.controller.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    ClientsModule.register([
      {
        name: 'ANTIFRAUD_RULES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'antifraud-rules',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'antifraud-rules-consumer',
          },
        },
      },
    ]),
  ],
  providers: [TransactionResolver, TransactionService],
  exports: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
