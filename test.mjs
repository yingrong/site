console.log(`say hello ${new Date()}`)
console.log(chalk.blue(`say hello ${new Date()}`))

testLog1();
await testLog()

async function testLog() {
	console.log(chalk.yellow('log in async funciton'))
}
function testLog1() {
	console.log('log in plain funciton')
}