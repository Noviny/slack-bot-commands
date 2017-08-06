const commandTester = (command, message) => {
	const ourCommand = new command(message);
	if (!ourCommand.run())
		console.log(
			`${ourCommand.name} did not match for ${ourCommand.message.text}`
		);
	ourCommand.action().then(console.log, console.error);
};

module.exports = commandTester;
