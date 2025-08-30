import { Controller } from '@nestjs/common';
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
import { AuthorizeUsecase } from '../usecases/authorize/authorize.usecase';

@Controller()
export class KafkaController {
	constructor(private readonly authorizeUsecase: AuthorizeUsecase) {}

	@EventPattern(Topics.AuthorizeRequest)
	async onAuthorizeRequest(
		@Payload() envelope: Envelope<AuthorizeRequest>,
		@Ctx() context: KafkaContext,
	) {
		console.log(
			`${KafkaController.name} - ${this.onAuthorizeRequest.name} Harusnya ini ke hit`,
		);
		await this.authorizeUsecase.execute(envelope);
	}

	@EventPattern(Topics.BootNotificationReceived)
	async onBootNotification(
		@Payload() envelope: Envelope<BootNotificationReceived>,
		@Ctx() context: KafkaContext,
	) {
		console.log(
			`${KafkaController.name} - ${this.onBootNotification.name} Harusnya ini ke hit`,
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
