const crypto = require('crypto')
const SALT_LENGTH = 10

class HashPass {
  static createHash(password) {
    let salt = this.generateSalt(SALT_LENGTH)
    let hash = this.md5(password + salt)
    return salt + hash
  }
  
  static validateHash(hash, password) {
    let salt = hash.substr(0, SALT_LENGTH)
    let validHash = salt + this.md5(password + salt)
    return hash === validHash
  }
  
  static generateSalt(len) {
    let set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
      setLen = set.length,
      salt = ''
    for (let i = 0; i < len; i++) {
      let p = Math.floor(Math.random() * setLen)
      salt += set[p]
    }
    return salt
  }
  
  static md5(string) {
    return crypto.createHash('md5').update(string).digest('hex')
  }
}


module.exports = HashPass