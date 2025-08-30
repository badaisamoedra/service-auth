# service-ocpp-processor

A NestJS microservice that consumes OCPP events from Kafka and publishes results to Kafka, following Clean Architecture boundaries.

## Structure

- `src/infrastructure/kafka` — Kafka producer/consumer abstractions
- `src/adapters` — inbound Kafka handlers (controllers) delegating to usecases
- `src/usecases` — business logic
- `src/app.module.ts` — wiring
- `src/main.ts` — microservice bootstrap

Contracts are imported from `@plugind/contracts` (local file dependency to `../contracts`).

## Run

- Build: `yarn build`
- Dev: `yarn start:dev`
- Prod: `yarn start:prod`

Environment:
- `KAFKA_BROKERS` (default: `localhost:9092`)
- `KAFKA_GROUP_ID` (default: `ocpp-consumer-group`)
- `KAFKA_CLIENT_ID` (default: `service-auth`)

The microservice listens to Kafka using Nest's microservice server and handles topics declared in `@plugind/contracts/Topics`.
