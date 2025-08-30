import { Injectable } from '@nestjs/common';
import { Envelope, AuthorizeRequest, AuthorizeResult, Topics } from '@plugind/contracts';
import { KafkaProducerService } from '../../infrastructure/kafka/kafka.producer.service';

@Injectable()
export class AuthorizeUsecase {
	constructor(private readonly producer: KafkaProducerService) {}

	async execute(envelope: Envelope<AuthorizeRequest>): Promise<void> {
		// Very simple example: always accept the idTag
		const result: Envelope<AuthorizeResult> = {
			correlationId: envelope.correlationId,
			ts: Date.now(),
			data: {
				cpId: envelope.data.cpId,
				result: { idTagInfo: { status: 'Accepted' } },
			},
		};

		await this.producer.emit(Topics.AuthorizeResult, result);
	}
}
