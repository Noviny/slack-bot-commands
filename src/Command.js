const slack = require('slack');
const token: string = process.env.SLACK_TOKEN;

type A = {
	text: string,
	user: string,
	channel: string,
};

export default class Command {
	text: string;
	testRegex: RegExp | undefined;
	constructor({ text, user, channel }: A) {
		this.text = text;
		this.userId = user;
		this.channelId = channel;
		this.explanation = 'This command has no explanation yet, sorry!';
		this.name = 'The Unnamed Command';
	}

	test(): boolean {
		if (!this.testRegex) return false;
		return this.testRegex.test(this.text);
	}

	action(): string {
		return 'This action has not been defined';
	}

	response(returnMessage: string) {
		slack.chat.postMessage(
			{ text: returnMessage, channel: this.channelId, token },
			// postMessage requires a callback
			console.log
		);
	}

	async run() {
		if (this.test()) {
			const returnMessage: string = await this.action();
			if (returnMessage) {
				this.response(returnMessage);
			}
		}
	}
}
