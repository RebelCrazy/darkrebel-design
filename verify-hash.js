/**
 * Script para verificar el hash SHA-256 de tu contraseña
 * Uso: node verify-hash.js "tu-contraseña"
 * 
 * El hash esperado es: 9a961c9ab9a9f790177617e009debfe57580c8c1eea61cdce27d618482bfa709
 */

const crypto = require('crypto');

async function sha256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

async function main() {
  const password = process.argv[2];
  
  if (!password) {
    console.error('❌ Uso: node verify-hash.js "tu-contraseña"');
    process.exit(1);
  }

  try {
    const hash = await sha256(password);
    const expectedHash = "9a961c9ab9a9f790177617e009debfe57580c8c1eea61cdce27d618482bfa709";
    
    console.log(`Contraseña: ${password}`);
    console.log(`Hash generado: ${hash}`);
    console.log(`Hash esperado: ${expectedHash}`);
    console.log(`✅ ¡Coinciden!: ${hash === expectedHash}`);
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();
