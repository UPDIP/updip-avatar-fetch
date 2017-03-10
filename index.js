const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('xml2js').parseString;
const pnut = require('pnut-butter');

fetch('http://www.updip.link/feed.xml').then((xml) => {
  return xml.text()
}).then((data) => {
  parse(data, (err, xml) => {
    xml.cards.card.forEach(card => {
      let username = card.title[0];

      pnut.avatar(`@${username}`).then(buffer => {
        fs.writeFileSync(`./images/${username}.png`, buffer);
        console.log(`${username} saved…`);
      }, (err) => {
        console.log(err);
      });

    })
  });
}).catch(err => {
  console.log(err);
});