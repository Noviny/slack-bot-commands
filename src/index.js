const Command = require('./Command');
const CommandRunner = require('./CommandRunner');
const CommandTester = require('./CommandTester');

CommandRunner.Command = Command;
CommandRunner.CommandTester = CommandTester;

module.exports = CommandRunner;
