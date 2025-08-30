import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka.producer.service';
import { KafkaConsumerService } from './kafka.consumer.service';

const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(',');
const clientId = process.env.KAFKA_CLIENT_ID || 'service-auth';

@Global()
@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'KAFKA_PRODUCER',
				transport: Transport.KAFKA,
				options: {
					client: { brokers, clientId },
					producerOnlyMode: true,
				},
			},
		]),
	],
	providers: [KafkaProducerService, KafkaConsumerService],
	exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
