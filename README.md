# Slack Bot commands

A quick and easy way to get set up with a slack bot, by having an extensible class that listens to messages to run commands.

## Getting Set Up

1. Create yourself a slack app, (see instructions on [slack](https://api.slack.com/slack-apps)), and get a slack token.

2. Create an index:

```js
const token = process.env.SLACK_TOKEN;
const commands = require('./commands');
const slackBot = require('slack-bot-commands')

let res =  slackBot(commands, token);

module.exports = res;
```

The res will be a function that when called, will set up a service worker listening for messages on the app. All messages that are not bot messages, will be passed to your commands.

3. Building your commands.

We have a class that can be exported and extended to create your commands, and then the base classes can be returned in an array as the commands to the SlackBot function.

```js
const { Command } = require('slack-bot-commands');

class ourCommand extends Command {
	constructor(message) {
		super(message);
		this.testRegex = /^some action/i;
		this.name = 'Our New Action';
	}

	action() {
		return 'This message will be printed when the message matches the regex';
	}
}
```

4. Behind the scenes

The Command class has a 'test' method, which will be called. If it returns true, the action will be called, and the result will be passed back to slack. All commands are tested for every non-bot slack message.
