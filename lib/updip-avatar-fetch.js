const fs = require('fs')
const fetch = require('node-fetch')
const parse = require('xml2js').parseString
const pnut = require('pnut-butter')

/**
 * Fetch users from the UPDIP feed
 */
function getUsersFromUpdip() {
  return new Promise((resolve, reject) => {
    fetch('http://www.updip.link/feed.xml').then((xml) => {
      return xml.text()
    }).then((data) => {
      parse(data, (err, xml) => {
        resolve(xml.cards.card.map(card => `@${card.title[0]}`))
      })
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * Get link to the profile images
 * @param {array} users
 */
function getLinksToProfileImages(users) {
  return new Promise((resolve, reject) => {
    pnut.users(users).then(res => {
      resolve(res.data.map(entry => {
        return {
          user: entry.username,
          avatar: entry.content.avatar_image.link
        }
      }))
    }, err => {
      reject(err)
    })
  })
}

module.exports = {
  getUsersFromUpdip,
  getLinksToProfileImages
}