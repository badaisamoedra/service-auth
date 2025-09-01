import { Module, Global } from '@nestjs/common';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka.producer.service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigModule } from '../../config/environment/environment-config.module';
import { EnvironmentConfigService } from '../../config/environment/environment-config.service';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.stage.${process.env['STAGE'] || 'development'}`,
			],
		}),
		ClientsModule.registerAsync([
			{
				name: 'SERVICE_AUTH',
				imports: [EnvironmentConfigModule],
				inject: [EnvironmentConfigService],
				useFactory: async (
					configService: EnvironmentConfigService,
				): Promise<KafkaOptions> => ({
					transport: Transport.KAFKA,
					options: {
						client: {
							brokers: configService
								.getKafkaBrokers()
								?.split(','),
						},
						consumer: {
							groupId: configService.getKafkaGroupId(),
						},
					},
				}),
			},
		]),
		EnvironmentConfigModule,
	],
	providers: [KafkaProducerService],
	exports: [KafkaProducerService],
})
export class KafkaProducerModule {}
