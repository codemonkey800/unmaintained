let Server = require('./server');

function main(args) {
    let server = new Server(args.port);
    server.start((err) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`Server started at http://localhost:${server.port}`);
          console.log('Type "stop" to stop the server');
          process.stdin.on('data', (data) => {
              if(data.toString().indexOf('stop') !== -1) {
                process.exit();
              }
          });
        }
    });
}

let argv = require('yargs').usage('Usage: $0 --port [num]')
                           .example('$0 --port 6969')
                           .option('port', {
                                demand: true,
                                default: 8080,
                                describe: 'The port for the server',
                                type: 'number'
                           })
                           .argv;
main(argv)