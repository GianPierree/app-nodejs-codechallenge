import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {

  validateTransaction(message: any) {
    console.log('Validating transaction:', message);

    return true;
  }
}
