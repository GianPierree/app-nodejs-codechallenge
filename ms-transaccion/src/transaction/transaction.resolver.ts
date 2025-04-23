import { 
  Resolver, 
  Query, 
  Mutation, 
  Args 
} from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';

@Resolver(() => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => Transaction)
  createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput): Promise<Transaction> {
    return this.transactionService.create(createTransactionInput);
  }

  @Query(() => Transaction, { name: 'transaction' })
  getTransactionById(@Args('id', { type: () => String }) id: string): Promise<Transaction> {
    return this.transactionService.findOne(id);
  }
}
