import { Module } from '@nestjs/common';
import { AuthorizeUsecase } from './authorize/authorize.usecase';
import { KafkaProducerModule } from '../../infrastructure/messaging/kafka-producer/kafka.producer.module';

@Module({
	imports: [KafkaProducerModule],
	providers: [AuthorizeUsecase],
	exports: [AuthorizeUsecase],
})
export class UsecasesModule {}
