# PBKDF2 for Node.js and Browsers

Small package exporting a PBKDF2 function that works both in Node.js and in browsers.

## Installation

```sh
npm install --save @ctrlpanel/pbkdf2
```

## Usage

```js
const pbkdf2 = require('@ctrlpanel/pbkdf2')

const password = Buffer.from('super secret')
const salt = Buffer.from('salt')

pbkdf2(password, salt, 500000, 32, 'SHA-512').then((result) => {
  console.log(result)
  //=> ArrayBuffer { byteLength: 32 }
})
```

## API

### `pbkdf2(password, salt, iterations, keylen, digest) => ArrayBuffer`

- password: `ArrayBuffer | Uint8Array | Buffer` - The password to base the derivation on
- salt: `ArrayBuffer | Uint8Array | Buffer` - The salt used when deriving
- iterations: `number` - Number of iterations
- keylen: `number` - Byte length of output key
- digest: `'SHA-256' | 'SHA-384' | 'SHA-512'` - Hash algorithm to use

Derive a key from `password`, and return it as an `ArrayBuffer`.
