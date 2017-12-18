type Digest = 'SHA-256' | 'SHA-384' | 'SHA-512'
declare function pbkdf2 (password: ArrayBuffer | Uint8Array, salt: ArrayBuffer | Uint8Array, iterations: number, keylen: number, digest: Digest): Promise<ArrayBuffer>

export = pbkdf2
