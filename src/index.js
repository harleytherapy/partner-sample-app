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
const path = '/clients/3'
const method = 'GET'
const requestId = uuid()
const isoDate = (new Date).toISOString()
const payload = `${method} ${path} ${requestId} ${isoDate}`
const authString = encHex.stringify(hmacSHA256(payload, authSecret))
const body = {
  email: 'person@example.net',
  phone: '+447999999999',
  first_name: 'First',
  last_name: 'Last',
  date_of_birth: '1986-10-04',
  partner_client_id: '33334'
}

const checkStatus = (res) => {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw new Error(`${res.status} - ${res.statusText}`);
    }
}

fetch(`${host}${path}`, {
  method: method,
  // body: JSON.stringify(body),
  headers: {
    'Authorization': `${authId}:${authString}`,
    'Date': isoDate,
    'X-HT-Request-id': requestId,
    'Content-type': 'application/json',
    'Accept': 'application/vnd.harleytherapyplatform.v1+json'
  }
})
  .then(checkStatus)
  .then((response) => {
    if (response.status == 404) {
      console.log(response.statusText)
    } else {
      return response.json()
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
  console.log(error)
  })