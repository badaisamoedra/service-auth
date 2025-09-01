import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.stage.${process.env['STAGE'] || 'development'}`,
			],
		}),
	],
	providers: [EnvironmentConfigService],
	exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
