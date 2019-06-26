
const config = require('../config')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const mongoose = require('mongoose')
const User = mongoose.model('User')


class AuthController {

  constructor() {

  }

  static signinAction(req) {
    return User.load({email: req.body.email}).then(user => {
      if(!user){
        throw new Error('Whoops, your email is wrong.')
      }
      if (!user.comparePassword(req.body.password)) {
        throw new Error('Whoops, your password is incorrect')
      }
      let token = jwt.sign({_id: user._id}, config.secret, {
        expiresIn: '300d'
      })
      return { token, user }
    }).catch(err => {
      throw err
    })
  }

  static createAccount(req) {
    return User.load({email: req.body.email}).then(user => {
      if (!user)
        return user
      else
        throw new Error('User email duplicated')
    }).then(user => {
      return new User(req.body).save()
    }).then(user => {
      let token = jwt.sign({_id: user._id}, config.secret, {
        expiresIn: '300d'
      })
      return { token, user }
    }).catch(err => {
      throw err
    })
  }

}

module.exports = AuthController