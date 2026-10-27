const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 5000;
const ROOT_DIR = __dirname;

console.log('======================================================');
console.log('🚀 EduCommunity Dashboard - Launching Live Website');
console.log('======================================================\n');

// 1. Start the server
console.log('⏳ Starting local production server on port 5000...');
const server = spawn('node', [path.join(ROOT_DIR, 'server', 'index.js')], {
  cwd: ROOT_DIR,
  stdio: ['ignore', 'pipe', 'inherit'],
  env: { ...process.env, PORT: `${PORT}`, NODE_ENV: 'production' },
});

server.stdout.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('EduCommunity Platform is Live')) {
    console.log('✅ Local server is running and ready on port 5000.\n');
  }
});

// 2. Launch SSH public tunnel
console.log('🌐 Connecting to secure public HTTPS tunnel (localhost.run)...');
console.log('⏳ Generating your live public link...\n');

const sshArgs = [
  '-o', 'StrictHostKeyChecking=no',
  '-o', 'ServerAliveInterval=30',
  '-R', `80:localhost:${PORT}`,
  'nokey@localhost.run',
];

const tunnel = spawn('ssh', sshArgs);
let urlFound = false;

tunnel.stdout.on('data', (chunk) => {
  const text = chunk.toString();
  const match = text.match(/https:\/\/[a-zA-Z0-9-]+\.lhr\.life/);

  if (match && !urlFound) {
    urlFound = true;
    const publicUrl = match[0];

    console.log('======================================================');
    console.log('🎉 YOUR WEBSITE IS LIVE AND GLOBALLY ACCESSIBLE!');
    console.log('======================================================\n');
    console.log(`🔗 Public Live URL : \x1b[32m\x1b[1m${publicUrl}\x1b[0m`);
    console.log(`🏠 Local URL      : http://localhost:${PORT}`);
    console.log(`🔑 Admin Passcode : admin2026\n`);
    console.log('------------------------------------------------------');
    console.log('👉 Anyone on mobile, laptop, or anywhere in the world can');
    console.log('   open this link to register students & view updates!');
    console.log('------------------------------------------------------\n');
    console.log('💡 Keep this process running to keep the website online.\n');

    // Save to LIVE_URL.txt
    const info = `EduCommunity Dashboard Live URL:\n${publicUrl}\n\nLocal URL: http://localhost:${PORT}\nAdmin Passcode: admin2026\nLaunched: ${new Date().toLocaleString()}\n`;
    fs.writeFileSync(path.join(ROOT_DIR, 'LIVE_URL.txt'), info);

    // Automatically open in default browser
    const startCmd = process.platform === 'win32' ? `start "" "${publicUrl}"` : `open "${publicUrl}"`;
    exec(startCmd);
  }
});

tunnel.stderr.on('data', (chunk) => {
  // Debug output if needed
});

tunnel.on('close', (code) => {
  console.log(`\nTunnel closed. (code: ${code})`);
  server.kill();
  process.exit(code);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Stopping live website...');
  tunnel.kill();
  server.kill();
  process.exit(0);
});
