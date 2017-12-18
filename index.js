const crypto = require('crypto')

function isArrayBufferOrTypedArray (input) {
  return (typeof input.byteLength === 'number' && typeof input.slice === 'function')
}

module.exports = function pbkdf2 (password, salt, iterations, keylen, digest) {
  if (!isArrayBufferOrTypedArray(password)) throw new TypeError('Expected "password" to be an ArrayBuffer, Uint8Array or Buffer')
  if (!isArrayBufferOrTypedArray(salt)) throw new TypeError('Expected "salt" to be an ArrayBuffer, Uint8Array or Buffer')
  if (digest !== 'SHA-256' && digest !== 'SHA-384' && digest !== 'SHA-512') throw new TypeError('Expected "digest" to be one of "SHA-256", "SHA-384" or "SHA-512"')

  password = Buffer.from(password)
  salt = Buffer.from(salt)
  digest = digest.replace('SHA-', 'sha')

  return new Promise(function (resolve, reject) {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, function (err, result) {
      if (err) return reject(err)

      resolve(result.buffer.slice(result.byteOffset, result.byteOffset + result.byteLength))
    })
  })
}
