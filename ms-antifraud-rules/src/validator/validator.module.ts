import { Module } from '@nestjs/common';
import { ValidatorService } from './validator.service';
import { ValidatorController } from './validator.controller';

@Module({
  providers: [ValidatorService],
  controllers: [ValidatorController]
})
export class ValidatorModule {}
