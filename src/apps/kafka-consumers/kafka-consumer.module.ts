import { Module } from '@nestjs/common';
import { KafkaConsumerController } from './kafka-consumer.controller';
import { UsecasesModule } from '../../core/usecases/usecases.module';

@Module({
	imports: [UsecasesModule],
	controllers: [KafkaConsumerController],
})
export class KafkaConsumerModule {}
