import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
	constructor(@Inject('SERVICE_AUTH') private readonly client: ClientKafka) {}

	async onModuleInit() {
		await this.client.connect();
	}

	async emit<T>(topic: string, message: T) {
		// For Kafka in Nest, `emit` is used for events (fire-and-forget)
		// The client expects a key/value object; we pass the value only
		return this.client.emit<any, T>(topic, message).toPromise();
	}
}
