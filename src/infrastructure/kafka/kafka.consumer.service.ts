import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';
import { Topics } from '@plugind/contracts';

@Injectable()
export class KafkaConsumerService implements OnModuleDestroy {
	private readonly logger = new Logger(KafkaConsumerService.name);

	private readonly kafka = new Kafka({
		brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
		clientId: process.env.KAFKA_CLIENT_ID || 'service-auth',
		logLevel: logLevel.NOTHING,
	});

	private consumer = this.kafka.consumer({
		groupId: process.env.KAFKA_GROUP_ID || 'ocpp-consumer-group',
	});

	private started = false;

	async start() {
		if (this.started) return;

		await this.consumer.connect();

		// Example subscription to multiple OCPP topics; handlers can be wired here if desired
		await this.consumer.subscribe({
			topic: Topics.BootNotificationReceived,
			fromBeginning: false,
		});

		await this.consumer.subscribe({
			topic: Topics.AuthorizeRequest,
			fromBeginning: false,
		});

		await this.consumer.subscribe({
			topic: Topics.MeterValues,
			fromBeginning: false,
		});

		await this.consumer.run({
			eachMessage: async ({ topic, partition, message }) => {
				this.logger.debug(
					`Received [${topic}] key=${message.key?.toString()} value=${message.value?.toString()}`,
				);
				// No-op: Nest @EventPattern handlers will process messages in the microservice context.
				// This is provided as an optional abstraction if you need low-level access.
			},
		});
		console.log(`${KafkaConsumerService.name} Harusnya ini ke hit`);
		this.started = true;
	}

	async onModuleDestroy() {
		try {
			await this.consumer.disconnect();
		} catch (e) {
			this.logger.warn(`Kafka consumer disconnect error: ${e}`);
		}
	}
}
