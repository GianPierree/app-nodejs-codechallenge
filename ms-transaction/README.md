# ms-transaction

The `ms-transaction` microservice is responsible for managing financial transactions, including their creation, retrieval, and interaction with other services.

## Features

- Handles the creation of new transactions.
- Communicates with the `ms-antifraud-rules` service to validate transactions.
- Stores transaction data in a database.
- Provides APIs to retrieve transaction details.

## Tech Stack

- **NestJS**: Framework for building scalable server-side applications.
- **Kafka**: Message broker for event-driven communication.
- **TypeScript**: Strongly typed programming language.
- **PostgreSQL**: Relational database for storing transaction data.

## Folder Structure

- `src/transaction`: Contains the core logic for transaction management.
  - `transaction.service.ts`: Handles business logic for transactions.
  - `transaction.controller.ts`: Exposes REST APIs for transaction operations.
  - `dto/transaction.dto.ts`: Defines the data structure for transactions.

## How It Works

1. A new transaction is created via the API.
2. The service emits a `transaction-created` event to Kafka.
3. The `ms-antifraud-rules` service validates the transaction and emits a `transaction-validated` event.
4. The transaction status is updated in the database based on the validation result.

## Environment Variables

Ensure the following environment variables are set:

- `KAFKA_BROKERS`: Kafka broker addresses (e.g., `localhost:9092`).
- `DATABASE_URL`: Connection string for the PostgreSQL database.

## Running the Service

1. Install dependencies:

   ```bash
   npm install

2. Start the service in development mode:

   ```bash
   npm run start:dev

## GraphQL Examples
Mutation: Create Transaction
  ```json
    mutation CreateTransaction {
      createTransaction(
        createTransactionInput: {
          accountExternalIdDebit: "a1f1dcd1-1234-4567-bb11-a2f3cc002212"
          accountExternalIdCredit: "c2e2adc9-4321-9876-aa33-bb44dd557788"
          tranferTypeId: 2
          value: 1200
        }
      ) {
        transactionExternalId
        value
        transactionStatus
        tranferTypeId
        createdAt
      }
    }
  ```

 Query: Get Transaction by ID
  ```json
      query GetTransaction {
        transaction(id: "5778206f-1a90-4c35-b9c3-1df68246cfa1") {
          transactionExternalId
          value
          createdAt
          transactionStatus
          tranferTypeId
        }
      }
  ```