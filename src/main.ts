import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',');
	const groupId = process.env.KAFKA_GROUP_ID || 'ocpp-consumer-group';

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers,
			},
			consumer: {
				groupId,
			},
		},
	});
	await app.listen();
}

bootstrap().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Fatal bootstrap error', err);
	process.exit(1);
});
