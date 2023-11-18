/**
 * Generate ES256 public and private keys.
 */

import { colors, encodeBase64 } from "./deps.ts";

// ES256
const algorithm = {
  name: "ECDSA",
  namedCurve: "P-256",
};

// generate ES256 key pair
const { publicKey, privateKey } = await crypto.subtle.generateKey(
  algorithm,
  true,
  ["sign", "verify"],
);

// public key
console.log(`\
${colors.green("Public Key:")}
${colors.green("- jwk:")}
${JSON.stringify(await crypto.subtle.exportKey("jwk", publicKey))}
${colors.green("- spki, base64 encoded:")}
${encodeBase64(await crypto.subtle.exportKey("spki", publicKey))}
`);

// private key
console.log(`\
${colors.red("Private Key:")}
${colors.red("- jwk:")}
${JSON.stringify(await crypto.subtle.exportKey("jwk", privateKey))}
${colors.red("- pkcs8, base64 encoded:")}
${encodeBase64(await crypto.subtle.exportKey("pkcs8", privateKey))}
`);
