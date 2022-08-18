import hmacSHA256 from 'crypto-js/hmac-sha256'
import encHex from 'crypto-js/enc-hex'
import fetch from 'node-fetch'
import uuid from 'uuid-random'

import dotenv from 'dotenv'
dotenv.config()

var digest

const authSecret = process.env.AUTH_SECRET
const authId = process.env.AUTH_ID
const host = process.env.HOST
const path = '/clients'
const method = 'POST'
const requestId = uuid()
const isoDate = new Date().toISOString()
const payload = `${method} ${path} ${requestId} ${isoDate}`
const authString = encHex.stringify(hmacSHA256(payload, authSecret))
const body = {
  email: 'person@example.net',
  phone_number: '+447999999999',
  first_name: 'First',
  last_name: 'Last',
  date_of_birth: '04/10/2001',
  gender: 'male',
}

const checkStatus = (res) => {
  if (res.ok) {
    return res
  } else {
    res.json().then((error) => {
      throw new Error(JSON.stringify(error, null, 2))
    })
  }
}

fetch(`${host}${path}`, {
  method: method,
  body: JSON.stringify(body),
  headers: {
    Authorization: `${authId}:${authString}`,
    Date: isoDate,
    'X-HT-Request-id': requestId,
    'Content-type': 'application/json',
    Accept: 'application/vnd.harleytherapyplatform.v1+json',
    'User-Agent': 'Awesome-App',
  },
})
  .then(checkStatus)
  .then((response) => {
    if (response) return response.json()
  })
  .then((data) => {
    if (data) console.log(data)
  })
  .catch((error) => {
    console.log(error)
  })
