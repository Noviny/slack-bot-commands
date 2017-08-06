const Command = require('../Command');

const commandHelpTemplate = command => {
	return command.testRegex
		? `${command.name}: ${command.testRegex.toString()}: ${command.explanation}\n`
		: `I have no test regex for ${command.name}! You should talk to your friendly dev about that.`;
};
class Help extends Command {
	constructor(message, commands) {
		super(message);
		this.commands = commands;
		this.testRegex = /^bot help/i;
		this.name = 'Help!';
	}

	async action() {
		return `The available commands are:
		${this.commands.reduce(
			(acc, command) => acc.concat(commandHelpTemplate(command)),
			''
		)}`;
	}
}

module.exports = Help;
