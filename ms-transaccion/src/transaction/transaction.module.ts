import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
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
})
export class TransactionModule {}
