import { Module } from '@nestjs/common';
// import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { AdaptersModule } from './apps/adapters/adapters.module';
import { UsecasesModule } from './core/usecases/usecases.module';

@Module({
	imports: [UsecasesModule, AdaptersModule],
})
export class AppModule {}
