import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	Ctx,
	EventPattern,
	KafkaContext,
	Payload,
} from '@nestjs/microservices';
import {
	Topics,
	Envelope,
	AuthorizeRequest,
	BootNotificationReceived,
	MeterValues,
} from '@plugind/contracts';
import { AuthorizeUsecase } from '../../core/usecases/authorize/authorize.usecase';

@Controller()
export class KafkaConsumerController {
	constructor(
		private readonly authorizeUsecase: AuthorizeUsecase,
		private readonly confidService: ConfigService,
	) {}

	@EventPattern(Topics.AuthorizeRequest)
	async onAuthorizeRequest(
		@Payload() envelope: Envelope<AuthorizeRequest>,
		@Ctx() context: KafkaContext,
	) {
		console.log(
			`${KafkaConsumerController.name} - ${this.onAuthorizeRequest.name} Harusnya ini ke hit`,
		);
		await this.authorizeUsecase.execute(envelope);
	}

	@EventPattern(Topics.BootNotificationReceived)
	async onBootNotification(
		@Payload() envelope: Envelope<BootNotificationReceived>,
		@Ctx() context: KafkaContext,
	) {
		console.log(
			`${KafkaConsumerController.name} - ${this.onBootNotification.name} Harusnya ini ke hit`,
		);
		// For demo purposes, just log or extend with a dedicated usecase later
		// eslint-disable-next-line no-console
		console.log('BootNotification received:', envelope);
	}

	@EventPattern(Topics.MeterValues)
	async onMeterValues(
		@Payload() envelope: Envelope<MeterValues>,
		@Ctx() context: KafkaContext,
	) {
		// For demo purposes, just log
		// eslint-disable-next-line no-console
		console.log('MeterValues received:', envelope);
	}
}
