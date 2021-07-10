const express = require('express')
const app = express()
const Database = require('@replit/database')
const db = new Database()
const ms = require('pretty-ms')
const fetch = require('node-fetch');
const querystring = require('querystring');
const chalk = require('chalk')
const winston = require('winston')
const got = require('got');

app.get("/", (req, res) => {
	res.send('smth')
})

app.listen(3000, () => {
	console.log(chalk.green('Success!'), 'Project is ready!')
})

let Discord = require('discord.js')
let client = new Discord.Client()
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('ready', () => logger.log('info', 'The bot is online!'));
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));


process.on('unhandledRejection', error => {
	console.error(chalk.redBright('ERROR'),'Unhandled promise rejection:', error);
});
const prefix = 'a'
const version = "0.034"
const Generation = "Alpha"
const update = `${Generation} ${version}\nRemoved aintrest and adeposit for the frequent malfuntions`

client.on('ready', () => {
	console.log(chalk.green("Success!"), "I'm in the Discord API!")
	client.user.setPresence({ activity: { name: `${prefix}help || Serving in ${client.guilds.cache.size} servers!`, type: "WATCHING"}, status: "idle"})
	client.user.setAvatar('https://th.bing.com/th/id/OIP.5araoHnk513A7vD22RrDtQAAAA?pid=ImgDet&w=236&h=236&rs=1')
	client.user.setUsername('Aimi')
});
function saveDMToAdminChannel(message) {
var textDM = `${message.author.username}#${message.author.discriminator} : ${message.content}`;
  client.channels.cache.get("858485012600717352").send(textDM);
}
db.list().then(keys => {console.log(`${keys}`)});
client.on('message', async message => {
	if(!message.content.startsWith(prefix) || message.author.bot || !message.guild || message.channel.type !== 'text') return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const logchannel = "858485012600717352"
	let invite = await message.channel.createInvite({
  maxAge: 0,
  maxUses: 0
}).catch(console.error);
	if(command === 'version' || command === 'ver') {
		let verembed = new Discord.MessageEmbed()
		.setColor("BLUE")
		.setAuthor(`${message.author.tag},`, message.author.displayAvatarURL({dynamic: true}))
		.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
		.setTitle(`${Generation} ${version}\nLatest update:\n${update}`)
		.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
		.setTimestamp()
		message.channel.send(verembed)
		client.channels.cache.get('858485012600717352').send(`${message.author.username}#${message.author.discriminator} || ${message.author.id} || ${message.guild.name}, ${message.guild.id}: ${message.content} Success => 'Success!`)
		return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n`)
	}
	if(command === 'ping') {
		message.channel.send("Pinging. . .").then((sentMessage) => sentMessage.edit(`Second Roundtrip latency: ${sentMessage.createdTimestamp - message.createdTimestamp}ms`))
		message.channel.send(`Second Websocket heartbeat: ${client.ws.ping}ms.`).then((sentMessage) => sentMessage.edit(`Second Websocket heartbeat: ${client.ws.ping}ms`))
		return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n`)
	}
	if(command === 'quiz' || command === 'trivia') {
		const check = await db.get(`quizcheck_${message.author.id}`);
		const timeout = 15000;
		let spe = '🙇‍♂️'
		let money = '💵'
		let socialpoints = await db.get(`sp_${message.author.id}`)
		let reward = 15
		let re = Math.random() * 26;
			let ressp = Math.floor(re) + 1;
		let balance = await db.get(`wallet_${message.author.id}`);
		if(check !== null && timeout - (Date.now() - check) > 0) {
			const timeleft = ms(timeout - (Date.now() - check))
			let left = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag}, *blushes* \nWait nu, wait pwease ≡(▔﹏▔)≡`, message.author.displayAvatarURL({dynamic: true}))
			.setDescription(`Time left - ${timeleft}!\nQuiz time later~!`)
			.setFooter(`${message.author.tag}` ,message.author.displayAvatarURL({dynamic: true}))
			message.channel.send(left)
		} else {
		const quiz = require('./quiz.json');
		const item = quiz[Math.floor(Math.random() * quiz.length)];
const filter = response => {
	return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
};
let equiz = new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(`${message.author.tag}'s game! \n(Help them, if yuo want to ＞﹏＜)`, message.author.displayAvatarURL({dynamic: true}))
.setTitle(`${item.question}`)
.setDescription(`${item.m}`)
.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
.setTimestamp()
message.channel.send(equiz).then(() => {
	message.channel.awaitMessages(filter, { max: 1, maxProcessed: 2, time: 30000, errors: ['time'] })
		.then(collected => {
			let embed = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag} was correct! (✿◡‿◡)`, message.author.displayAvatarURL({dynamic: true}))
			.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
			.setTitle(`You've got ${ressp} ${money} and, ${ressp + 15} ${spe}\n <(≧﹏≦)>!`)
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
			.setTimestamp()
			message.channel.send(embed)
			.then(db.set(`wallet_${message.author.id}`, balance + ressp))
			.then(db.set(`sp_${message.author.id}`, socialpoints + ressp + 15))
			.then(db.set(`quizcheck_${message.author.id}`, Date.now()));
		})
		.catch(collected => {
			let timeoutembed = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag}, timeout! ＞︿＜`, message.author.displayAvatarURL({dynamic: true}))
			.setTitle(`Nice try but, try again later ヽ(✿ﾟ▽ﾟ)ノ`)
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
			.setTimestamp()
			message.channel.send(timeoutembed);
		});
});
		}
		return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n\"${prefix}quiz\"`)
	}
	if(command === 'cat') {
		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		let filea = new Discord.MessageAttachment(`${file}`)
		message.channel.send("Using https://aws.random.cat")
		message.channel.send("Here's yuor φ(゜▽゜*)♪ nekko")
		message.channel.send(filea);
		client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n\"${prefix}cat\"`)
	}
	if(command === 'build' || command === 'info') {
		let epic = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setAuthor(`${message.author.tag}, ( •̀ ω •́ )✧`, message.author.displayAvatarURL({dynamic: true}))
		.setTitle("PROGRAMMED USING NODE.JS, 24/7 HOSTING USING\nREPL.IT AND, UPTIMEBOT\nCAT COMMAND RESPONSE USING:\nRANDOM CAT API https://aws.random.cat/\nURBAN COMMAND USING URBAN API https://urbandictionary.com\nMEME COMMAND USING REDDIT API https://reddit.com")
		.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
		.setTimestamp()
		message.channel.send(epic);
		return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n`)
	}
	if (command === 'urban') {
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

		const query = querystring.stringify({ term: args.join(' ') });
		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`)
			.then(response => response.json());
			if (!list.length) {
				let idkwdym = new Discord.MessageEmbed()
				.setColor("RED")
				.setAuthor(`${message.author.tag}, No results!`, message.author.displayAvatarURL({dynamic: true}))
				.setDescription(`No results found for **${args.join(' ')}**`)
				.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
				.setThumbnail('https://images-ext-2.discordapp.net/external/HMmIAukJm0YaGc2BKYGx5MuDJw8LUbwqZM9BW9oey5I/https/i.imgur.com/VFXr0ID.jpg')
				.setTimestamp()
		return message.channel.send(idkwdym);

	const [answer] = list;

const embed = new Discord.MessageEmbed()
	.setColor('BLUE')
	.setTitle(`Definition of ${answer.word}`)
	.setURL(answer.permalink)
	.setThumbnail('https://images-ext-2.discordapp.net/external/HMmIAukJm0YaGc2BKYGx5MuDJw8LUbwqZM9BW9oey5I/https/i.imgur.com/VFXr0ID.jpg')
	.addFields(
		{ name: 'Definition', value: trim(answer.definition, 1024) },
		{ name: 'Example', value: trim(answer.example, 1024) },
		{ name: 'Rating', value: `${answer.thumbs_up} 👍 ${answer.thumbs_down} 👎` },
		{ name: 'Posted by', value: trim(answer.author, 1024)},
		{ name: 'Posted date', value: trim(answer.written_on, 13)}
	);

message.channel.send(embed);
return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n`)
	}
	}
			if(command === 'bal' || command === 'balance') {
		let money = "💵"
		let credit = "💳"
		let spe = "🙇‍♂️"
		let balanc = await db.get(`wallet_${message.author.id}`);
		let walle = await db.get(`bal_${message.author.id}`);
		let socialpoint = await db.get(`sp_${message.author.id}`);

		if(balanc === null) balanc = 0
		if(walle === null) walle = 0
		if(socialpoint === null) socialpoint = 0
		let balance = parseInt(balanc).toFixed(0)
		let wallet = parseInt(walle).toFixed(0)
		let socialpoints = parseInt(socialpoint)

		let moneyembed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setAuthor(`${message.author.tag}, here's your money!`, message.author.displayAvatarURL({dynamic: true}))
		.setDescription(`Wallet ${money}: ${balance}\nBank ${credit}: ${wallet}\nSocial Points ${spe}: ${socialpoints}`)
		.setFooter(`${message.author.tag}` ,message.author.displayAvatarURL({dynamic: true}))
		.setTimestamp()
		.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
		message.channel.send(moneyembed)
		client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n`)
	}
	if(command === 'daily') {
		let money = "💵"
		let spe = "🙇‍♂️"
		const check = await db.get(`dailycheck_${message.author.id}`);
		const timeout = 86400000;
		if(check !== null && timeout - (Date.now() - check) > 0) {
			const timeleft = ms(timeout - (Date.now() - check))
			let left = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag}, you've already claimed your daily prize!`, message.author.displayAvatarURL({dynamic: true}))
			.setDescription(`Time left - ${timeleft}!\nClaim it later!`)
			.setFooter(`${message.author.tag}` ,message.author.displayAvatarURL({dynamic: true}))
			message.channel.send(left)
		} else {
			let rewas = await db.get(`sp_${message.author.id}`)
			let socia = 50
			let re = 500 + rewas
			let reward = await db.get(`wallet_${message.author.id}`)
			let rewardembed = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag}, you've claimed your daily rewards!`, message.author.displayAvatarURL({dynamic: true}))
			.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
			.setDescription(`You've got ${re.toLocaleString()} ${money} and, ${socia.toLocaleString()} ${spe} as a daily reward!`)
			message.channel.send(rewardembed)
			await db.set(`wallet_${message.author.id}`, reward + re)
			await db.set(`sp_${message.author.id}`, rewas + 30)
			await db.set(`dailycheck_${message.author.id}`, Date.now())
			client.channels.cache.get('858485012600717352').send(`${message.author.username}#${message.author.discriminator} || ${message.author.id} || ${message.guild.name}, ${message.guild.id}: ${message.content} Success => 'Success!`)
		}
		return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}\n`)
	}
	if(command === 'beg') {
		let money = '💵'
		let spe = "🙇‍♂️"
		const chec = await db.get(`begcheck_${message.author.id}`);
		const timeou = 20000;
		if(chec !== null && timeou - (Date.now() - chec) > 0) {
			const timelef = ms(timeou - (Date.now() - chec))
			let left = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag}, wait a bit , sowwy (>~<).`, message.author.displayAvatarURL({dynamic: true}))
			.setDescription(`Time left - ${timelef}!\nBeg later!`)
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
			.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
			.setTimestamp()
			message.channel.send(left)
		} else {
			let erre = Math.random() * 3;
			let erree = Math.floor(erre) + 1;
			let re = Math.random() * 11;
			let ressp = Math.floor(re) + 1;
			let ress = Math.floor(re) + 1;
			let reward = await db.get(`wallet_${message.author.id}`)
			let rewarspe = await db.get(`sp_${message.author.id}`)
			if(erree = 1) {
			let rewardembed = new Discord.MessageEmbed()
			.setColor("GREEN")
			.setAuthor(`${message.author.tag}, you've got money!`, message.author.displayAvatarURL({dynamic: true}))
			.setDescription(`You've got ${ress.toLocaleString()} ${money} from someone!\nBut lost ${ressp} Social points ${spe}!`)
			.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
			.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
			message.channel.send(rewardembed)
			await db.set(`sp_${message.author.id}`, rewarspe - ressp)
			await db.set(`wallet_${message.author.id}`, reward + ress)
			await db.set(`begcheck_${message.author.id}`, Date.now())
			client.channels.cache.get('858485012600717352').send(`${message.author.username}#${message.author.discriminator} || ${message.author.id} || ${message.guild.name}, ${message.guild.id}: ${message.content} Success => 'Success!`)
			}else {
				let uhohembed = new Discord.MessageEmbed()
				.setColor("RED")
				.setAuthor(`${message.author.tag}, it seems like, they don't want to...`)
				.setDescription("They didn't want to 〒▽〒")
				.setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
				.setTimestamp()
				message.channel.send(uhohembed)
			}
		}
		return client.channels.cache.get('860778573363019807').send(`Discord tag - ${message.author.tag} | ${ms(Date.now())}\nID ${message.author.id} - link\n${invite}`)
	}
});


client.login(process.env.token);