/* global crypto */

function isArrayBufferOrTypedArray (input) {
  return (typeof input.byteLength === 'number' && typeof input.slice === 'function')
}

function isTypedArray (input) {
  return (typeof input.byteOffset === 'number' && typeof input.buffer === 'object')
}

module.exports = function pbkdf2 (password, salt, iterations, keylen, digest) {
  if (!isArrayBufferOrTypedArray(password)) throw new TypeError('Expected "password" to be an ArrayBuffer, Uint8Array or Buffer')
  if (!isArrayBufferOrTypedArray(salt)) throw new TypeError('Expected "salt" to be an ArrayBuffer, Uint8Array or Buffer')
  if (digest !== 'SHA-256' && digest !== 'SHA-384' && digest !== 'SHA-512') throw new TypeError('Expected "digest" to be one of "SHA-256", "SHA-384" or "SHA-512"')

  if (isTypedArray(password)) password = password.buffer.slice(password.byteOffset, password.byteOffset + password.byteLength)
  if (isTypedArray(salt)) salt = salt.buffer.slice(salt.byteOffset, salt.byteOffset + salt.byteLength)

  return Promise.resolve()
    .then(function() { return crypto.subtle.importKey('raw', password, { name: 'PBKDF2' }, false, ['deriveBits']); })
    .then(function(key) { return crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations, hash: { name: digest } }, key, keylen << 3); })
}
