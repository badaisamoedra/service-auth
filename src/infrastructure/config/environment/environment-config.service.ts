import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
	constructor(private readonly configService: ConfigService) {}
	getKafkaBrokers(): string {
		return this.configService.get<string>('KAFKA_BROKERS');
	}

	getKafkaClientId(): string {
		return this.configService.get<string>('KAFKA_CLIENT_ID');
	}

	getKafkaGroupId(): string {
		return this.configService.get<string>('KAFKA_GROUP_ID');
	}

	getKafkaReplyTopic(): string {
		return this.configService.get<string>('KAFKA_REPLY_TOPIC');
	}

	getDatabaseConnection(): string {
		return this.configService.get<string>('DB_CONNECTION');
	}

	getDatabasePort(): number {
		return this.configService.get<number>('DB_PORT');
	}

	getDatabaseHost(): string {
		return this.configService.get<string>('DB_HOST');
	}

	getDatabaseUser(): string {
		return this.configService.get<string>('DB_USERNAME');
	}

	getDatabasePassword(): string {
		return this.configService.get<string>('DB_PASSWORD');
	}

	getDatabaseName(): string {
		return this.configService.get<string>('DB_DATABASE');
	}

	getDatabaseSync(): boolean {
		const dbSync = this.configService.get<string>('DB_SYNC');
		return dbSync === 'true' ? true : false;
	}
}
