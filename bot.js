const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const momnt = require('moment-duration-format')
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Aktif Tutuyorum.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

///

client.on('guildMemberAdd', member => { 
  var üyesayısı = member.guild.members.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) {
  üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
    return {
  '0': `<a:sifir:727817415228129300>`,
  '1': `<a:bir:727817414456246272>`,
  '2': `<a:iki:727817414586400778>`,
  '3': `<a:uc:727817414590464081>`,
  '4': `<a:dort:727817414477348924>`,
  '5': `<a:bes:727817413608996954>`,
  '6': `<a:alti:727817413068062721>`,                       
  '7': `<a:yedi:727817411998515211>`,
  '8': `<a:sekiz:727817411071311953>`,
  '9': `<a:dokuz:727817404725461052>`,}[d];
    })
  }

let aylartoplam = {
 
  "01": "Ocak",
      "02": "Şubat",
      "03": "Mart",
      "04": "Nisan",
      "05": "Mayıs",
      "06": "Haziran",
      "07": "Temmuz",
      "08": "Ağustos",
      "09": "Eylül",
      "10": "Ekim",
      "11": "Kasım",
      "12": "Aralık"
}
let aylar = aylartoplam 
let user = client.users.get(member.id);
require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D")   
  const emoji = client.emojis.find(emoji => emoji.name === "kelebek");






  var kontrol;
  if (gün < 7) kontrol = `Güvenilir Değil!`
  if (gün > 7) kontrol = `Güvenli.`
  let rol = "728599283552485376"
let kanal = "727599830276505620"
if(!kanal) return
//`${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}`)
member.guild.channels.get(kanal).send(`${emoji} Sunucumuza hoş geldin! ${member},\`${member.id}\`, Seninle beraber ${üyesayısı} kişiyiz.\n\n${emoji} Kaydının yapılması için **sesli odaya** gelip **ses** vermen gerek\n\n${emoji} Hesabın oluşturulma tarihi: **${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}**\n\n${emoji} Hesabınız: **${kontrol}**\n\n${emoji} <@&${rol}> Seninle ilgilenecektir.`)
})

///

client.on("message", message => {
  var miran = db.get(`miranafk.${message.author.id}.afk`);  // miran CodEming
  if (!miran) return;
  var afkb = JSON.parse(miran);
  if (new Date().getTime() - afkb.zaman < 1000) return;
  db.delete(`miranafk.${message.author.id}.afk`);
  var süre = new Date().getTime() - afkb.zaman;
    let isim = message.member.nickname.replace("[AFK]", "");
            message.member.setNickname(isim)

  var sürem = moment
    .duration(süre)
    .format("Y [Yıl], M [Ay], D [Gün], H [Saat], m [Dakika], s [Saniye]");
      const embed2 = new Discord.RichEmbed()
    .setDescription(`AFK Modundan Başarıyla Çıktın, AFK Kalma Süren; **${sürem}** .`)
    .setColor('RANDOM')
    .setFooter(`By Resital`)
    .setTimestamp()
    message.channel.send(embed2).then(msg => msg.delete(9000))
});

client.on("message", message => {
          const emoji2 = client.emojis.find(emoji2 => emoji2.name === "tik");
  let etiket = message.mentions.users.first();
  if (!etiket) return;
  var miranafk = db.fetch(`miranafk.${etiket.id}.afk`);
  if (!miranafk) return;
  var miran = JSON.parse(miranafk);
  if (!miran) return;   // miran CodEming
  var süre = new Date().getTime() - miran.zaman;
  var sürem = moment
    .duration(süre)
    .format("Y [Yıl], M [Ay], D [Gün], H [Saat], m [Dakika], s [Saniye]");
  if (miran) {
    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)   
    .setDescription(`**ŞUAN O ÇOK UZAKLARDA**`)
    .setColor('RANDOM')
    .addField('AFK Kalma Süresi', `${sürem} `)
    .addField('Afk Kalma Sebebi', `${miran.sebep}`)
    .setFooter(`By Resital`)
    .setTimestamp()
    message.channel.send(embed).then(msg => msg.delete(9000))
  }
});

///

client.on("userUpdate", function(oldUser, newUser){
const emoji = client.emojis.find(emoji => emoji.name === "tik");
const emoji2 = client.emojis.find(emoji2 => emoji2.name === "tik");
if(oldUser.username === newUser.username) return  
  let sunucuID = "727545198632239234" 
  let logID = "727545199101739141" 
  let rolID = "727545745766613173"
  let tag = "ˡʸᶰᶜʰ"
  let member = client.guilds.get(sunucuID).members.get(oldUser.id)
  let codeming = oldUser.username
  let newcodeming = newUser.username
   
  
if(codeming.includes(tag)) {
if(!newcodeming.includes(tag)) { 
 client.channels.get(logID).send('**<@!'+member.id+'>, tagımızı silerek ailemizden ayrıldı, GÖRÜŞÜRÜZ!**') 
 newUser.send(`Tagımızı salmışsın üzdün bizii noluurrr tagımıızzıı geri aaaaaalll \`௮\``)
member.removeRole(rolID)
} 
}
  
if(!codeming.includes(tag)) {
if(newcodeming.includes(tag)) { 
 client.channels.get(logID).send('**<@!'+member.id+'>, tagımızı alarak ailemize katıldı, HOŞGELMİŞSİNKEE**') 
 newUser.send(`Tagımızı almışsınkeee çoook teşeekkküürrrlleeerrrrrr. **AİLEMİZE HOŞGELDİİİNNNNNKEEE**`)
 member.addRole(rolID)  
} 
}  
  }); 

///

const iltifatlar = [
  'İlk görüşte aşka inanır mısın? Yoksa gidip tekrar mı geleyim?',
  'Öyle güzel bakma bana; Allah yarattı demem, severim!',
  'Telefon numaramı unutmuşum, seninkini ödünç alabilir miyim?',
  'Bu güzellik gerçek olamaz, sanırım rüya görüyorum. Bana bir çimdik atar mısın?',
  'Sabah namazında, ışıkları yanan evler kadar güzelsin yar. Daha ne diyeyim ki!',
  'Çok yorulmuş olmalısın. Bütün gün beynimin içinde koşturup durdun.',
  'Annene sor bakayım , damat lazım mıymış?',
  'Aman Allah’ım gerçekten omuz kemikleri, ben bunları bir çift kanat sanmıştım.',
];

var iltifatSayi = 0; 
client.on("message", async message => {
  if(message.channel.id !== "727545199101739141" || message.author.bot) return;
  iltifatSayi++
  if(iltifatSayi >= 50) { 
    iltifatSayi = 0;
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`**${(iltifatlar)[random]}**`);
  };
});

//

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.sendMessage('Aleyküm Selam Kanka Hoşgeldin,');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Sa') {
    msg.channel.sendMessage('Aleyküm Selam Kanka Hoşgeldin,');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sea') {
    msg.channel.sendMessage('Aleyküm Selam Kanka Hoşgeldin,');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Sea') {
    msg.channel.sendMessage('Aleyküm Selam Kanka Hoşgeldin,');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'selamın aleyküm') {
    msg.channel.sendMessage('Aleyküm Selam Kanka Hoşgeldin,');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamın Aleyküm') {
    msg.channel.sendMessage('Aleyküm Selam Kanka Hoşgeldin,');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!tag') {
    msg.channel.sendMessage('\`ˡʸᶰᶜʰ\`');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.channel.sendMessage('\`ˡʸᶰᶜʰ\`');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'link') {
    msg.channel.sendMessage('https://discord.gg/5sdQmmU')
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === '.link') {
    msg.channel.sendMessage('https://discord.gg/5sdQmmU')
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!link') {
    msg.channel.sendMessage('https://discord.gg/5sdQmmU')
  }
})

client.on("message", message => {
  db.add(`mesajbilgi_${message.author.id}`, 1)
})

///

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  let oV = oldMember.voiceChannel;
  let nV = newMember.voiceChannel;
  if (!oV) {
   var ksesgiris = Date.now()
   db.set(`kgiris_${oldMember.id}`, ksesgiris)
  } else if (!nV) {
   var kegiris = db.get(`kgiris_${oldMember.id}`)
   if(kegiris === null) return;
    var sessuresi = Date.now()-kegiris
    var sesdedurma = db.get(`${oldMember.id}_sesdedur`)
    var sncinsindensure = Math.round(sessuresi/1000)
    if(sesdedurma === null) {
      db.set(`${oldMember.id}_sesdedur`, sncinsindensure) //Veriyi çekerken db.get(`KULLANICI ID_sesdedur`) kullanın - var ses_suresi = Math.round(db.get(`KULLANICI ID_sesdedur`)/60)+" dakika" - kullanarak dakika cinsinden kullanabilirsiniz
    } else {      
      db.set(`${oldMember.id}_sesdedur`, sesdedurma+sncinsindensure) //Veriyi çekerken db.get(`KULLANICI ID_sesdedur`) kullanın - var ses_suresi = Math.round(db.get(`KULLANICI ID_sesdedur`)/60)+" dakika" -kullanarak dakika cinsinden kullanabilirsiniz
    }   
  }
});
