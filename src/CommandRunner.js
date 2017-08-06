const Help = require('./plugins/Help');
const slack = require('slack');
const bot = slack.rtm.client();

const CommandRunner = (plugins, token) => {
	return () => {
		bot.message(async message => {
			if (message.subtype !== 'bot_message') {
				const instantiatedPlugins = plugins.map(plugin => new plugin(message));
				// The help plugin wants all the instantiated plugins to do its thing
				const withHelpPlugin = instantiatedPlugins.concat(
					new Help(message, instantiatedPlugins)
				);
				withHelpPlugin.map(plugin => plugin.run());
			}
		});
		// start listening to the slack team associated to the token
		bot.listen({ token });
	};
};

module.exports = CommandRunner;
