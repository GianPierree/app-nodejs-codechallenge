import { 
  Field, 
  Float, 
  InputType, 
  Int 
} from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field()
  accountExternalIdDebit: string;

  @Field()
  accountExternalIdCredit: string;

  @Field(() => Int)
  tranferTypeId: number;

  @Field(() => Float)
  value: number;
}
