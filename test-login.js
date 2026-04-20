/**
 * Script para probar la autenticación localmente
 * Uso: node test-login.js "contraseña"
 */

const crypto = require('crypto');

async function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

async function testLogin() {
  const password = process.argv[2] || "I6FWy6IQjNwXdIo6e2k4Gw==";
  const expectedUser = "darkrebel-admin";
  const expectedHash = "566b7f509faad3ec40eb98ff59e41a7846b383c874d1a94629db8fe8c92ce2c1";
  
  const providedUser = "darkrebel-admin";
  const providedHash = await sha256(password);
  
  console.log("\n=== TEST DE AUTENTICACIÓN LOCAL ===\n");
  console.log("Usuario proporcionado:", providedUser);
  console.log("Usuario esperado:", expectedUser);
  console.log("Coinciden:", providedUser === expectedUser);
  
  console.log("\nContraseña proporcionada:", password);
  console.log("Hash generado:", providedHash);
  console.log("Hash esperado:", expectedHash);
  console.log("Coinciden:", providedHash === expectedHash);
  
  const isValid = providedUser === expectedUser && providedHash === expectedHash;
  console.log("\n✅ AUTENTICACIÓN VÁLIDA:", isValid);
  console.log("\nSi esto devuelve false, hay un problema con:");
  console.log("1. El usuario (debe ser: darkrebel-admin)");
  console.log("2. La contraseña (debe ser: I6FWy6IQjNwXdIo6e2k4Gw==)");
  console.log("3. El hash (debe ser: 566b7f509faad3ec40eb98ff59e41a7846b383c874d1a94629db8fe8c92ce2c1)");
}

testLogin().catch(console.error);
