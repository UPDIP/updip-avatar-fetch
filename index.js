const fetcher = require('./lib/updip-avatar-fetch')
const fs = require('fs')
const fetch = require('node-fetch')

const targetDir = process.env.UPDIP_AVATAR_FETCH_DIR || './images/'

fetcher.getUsersFromUpdip().then(users => {
  return fetcher.getLinksToProfileImages(users);
}).then(users => {
  console.log(users);

  users.forEach(user => {
    fetch(user.avatar).then(res => {
      let dest = fs.createWriteStream(`${targetDir}${user.user}.png`)
      res.body.pipe(dest)
    }).then(() => {
      console.log(new Date(), user.user, 'fetched successfully');
    }, err => {
      console.log(err);
    })
  })

}).catch(err => {
  console.log(err);
})
