import { Module } from '@nestjs/common';
// import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { AdaptersModule } from './adapters/adapters.module';
import { UsecasesModule } from './usecases/usecases.module';

@Module({
	imports: [UsecasesModule, AdaptersModule],
})
export class AppModule {}
