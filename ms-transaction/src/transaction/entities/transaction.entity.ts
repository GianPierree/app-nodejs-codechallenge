import { 
  ObjectType, 
  Field, 
  Float, 
  Int 
} from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Transaction {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  transactionExternalId: string;

  @Field()
  @Column()
  accountExternalIdDebit: string;

  @Field()
  @Column()
  accountExternalIdCredit: string;

  @Field(() => Float)
  @Column('decimal')
  value: number;

  @Field(() => Int)
  @Column()
  tranferTypeId: number;

  @Field()
  @Column({ default: 'PENDING' })
  transactionStatus: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
