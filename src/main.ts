import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

dotenv.config({ path: `.env.stage.${process.env['STAGE'] || 'development'}` });

async function bootstrap() {
	const brokers = process.env.KAFKA_BROKERS.split(',');
	const groupId = process.env.KAFKA_GROUP_ID;

	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers,
				},
				consumer: {
					groupId,
				},
			},
		},
	);
	await app.listen();
}

bootstrap().catch((err) => {
	// eslint-disable-next-line no-console
	console.error('Fatal bootstrap error', err);
	process.exit(1);
});
