/* eslint-env mocha */

const assert = require('assert')

const arrayBufferToHex = require('array-buffer-to-hex')
const hexToArrayBuffer = require('hex-to-array-buffer')

const pbkdf2 = require('./')

describe('pbkdf2', () => {
  it('SHA-256', () => {
    const password = hexToArrayBuffer('0b0c0d0e0f101112')
    const salt = hexToArrayBuffer('15161718191a1b1c')
    const expected = 'c8948ee46627d307a3966524347e71b3'

    return pbkdf2(password, salt, 100000, 16, 'SHA-256').then((actual) => {
      assert.strictEqual(arrayBufferToHex(actual), expected)
    })
  })

  it('SHA-384', () => {
    const password = hexToArrayBuffer('0b0c0d0e0f101112')
    const salt = hexToArrayBuffer('15161718191a1b1c')
    const expected = 'ae5ae5cd5ab790f342475563918ad18fb4b0743bf73d91a4'

    return pbkdf2(password, salt, 250000, 24, 'SHA-384').then((actual) => {
      assert.strictEqual(arrayBufferToHex(actual), expected)
    })
  })

  it('SHA-512', () => {
    const password = hexToArrayBuffer('0b0c0d0e0f101112')
    const salt = hexToArrayBuffer('15161718191a1b1c')
    const expected = '27cccdf85bad00bd1b5f9b90f3956e88ebe330b93de6d35f0c43e67e3c894d66'

    return pbkdf2(password, salt, 500000, 32, 'SHA-512').then((actual) => {
      assert.strictEqual(arrayBufferToHex(actual), expected)
    })
  })
})
