import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { UsecasesModule } from '../usecases/usecases.module';

@Module({
	imports: [UsecasesModule],
	controllers: [KafkaController],
})
export class AdaptersModule {}
