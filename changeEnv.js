const fs = require('fs');
const stream = fs.createWriteStream("./.env");

console.log(`SET ENVORIMENT: ${process.argv[2]}`);

stream.once('open', function() {
  switch (process.argv[2]) {
    case 'NODE_ENV=development':
      stream.write("NODE_ENV=development\n");
      break;
    case 'NODE_ENV=production':
      stream.write("NODE_ENV=production\n");
      break;
    default:
      stream.write("NODE_ENV=development\n");
  }

  stream.end();
});
