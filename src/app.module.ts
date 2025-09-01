import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaProducerModule } from './infrastructure/messaging/kafka-producer/kafka.producer.module';
import { UsecasesModule } from './core/usecases/usecases.module';
import { KafkaConsumerModule } from './apps/kafka-consumers/kafka-consumer.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.stage.${process.env['STAGE'] || 'development'}`,
			],
		}),
		UsecasesModule,
		KafkaProducerModule,
		KafkaConsumerModule,
		DatabaseModule,
	],
})
export class AppModule {}
