# ms-antifraud-rules

The `ms-antifraud-rules` microservice is responsible for validating financial transactions and determining their status (approved or rejected) based on predefined rules.

## Features

- Listens to `transaction-created` events from Kafka.
- Validates transactions based on their value:
  - Transactions with a value greater than 1000 are rejected.
  - Transactions with a value less than or equal to 1000 are approved.
- Emits `transaction-validated` events with the updated transaction status.

## Tech Stack

- **NestJS**: Framework for building scalable server-side applications.
- **Kafka**: Message broker for event-driven communication.
- **TypeScript**: Strongly typed programming language.

## Folder Structure

- `src/validator`: Contains the core logic for validating transactions.
  - `validator.service.ts`: Handles transaction validation logic.
  - `validator.controller.ts`: Listens to Kafka events and triggers validation.
  - `dto/validator.dto.ts`: Defines the data structure for transaction validation.

## How It Works

1. The service listens to the `transaction-created` Kafka topic.
2. When a transaction is created, the service validates it:
   - If the transaction value is greater than 1000, it is marked as `REJECTED`.
   - Otherwise, it is marked as `APPROVED`.
3. The service emits a `transaction-validated` event with the transaction's updated status.

## Environment Variables

Ensure the following environment variables are set:

- `KAFKA_BROKERS`: Kafka broker addresses (e.g., `localhost:9092`).

## Running the Service

1. Install dependencies:

   ```bash
   npm install
   
2. Start the service in development mode:

   ```bash
   npm run start:dev

3. Build the service:

   ```bash
   npm run build

## Kafka Topics
* Input: transaction-created
  ```json
  {
    "transactionExternalId": "123e4567-e89b-12d3-a456-426614174000",
    "value": 1500
  }
  
* Output: transaction-validated
  ```json
  {
    "transactionExternalId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "REJECTED"
  }


