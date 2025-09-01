import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormAsyncPostgresOption } from './typeorm/typeorm-postgres.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [
				`.env.stage.${process.env['STAGE'] || 'development'}`,
			],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync(typeormAsyncPostgresOption),
	],
})
export class DatabaseModule {}
