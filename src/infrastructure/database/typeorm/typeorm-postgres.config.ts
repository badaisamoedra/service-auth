import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Auth } from 'src/core/domain/entities/auth.entity';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment/environment-config.module';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment/environment-config.service';

export const typeormAsyncPostgresOption: TypeOrmModuleAsyncOptions = {
	imports: [EnvironmentConfigModule],
	inject: [EnvironmentConfigService],
	useFactory: async (configService: EnvironmentConfigService) => ({
		type: 'postgres',
		port: configService.getDatabasePort(),
		host: configService.getDatabaseHost(),
		username: configService.getDatabaseUser(),
		password: configService.getDatabasePassword(),
		database: configService.getDatabaseName(),
		synchronize: configService.getDatabaseSync(),
		autoLoadEntities: true,
		entities: [Auth],
	}),
};
