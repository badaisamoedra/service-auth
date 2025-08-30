import { Module } from '@nestjs/common';
import { AuthorizeUsecase } from './authorize/authorize.usecase';
import { KafkaModule } from '../../infrastructure/messaging/kafka/kafka.module';

@Module({
	imports: [KafkaModule],
	providers: [AuthorizeUsecase],
	exports: [AuthorizeUsecase],
})
export class UsecasesModule {}
