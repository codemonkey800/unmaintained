let express   = require('express'),
    apiRouter = require('./api-router');

class Server {
    constructor(port=8080) {
        this._port = port;
        this._app = express();
        this._server = null;

        this._app.use('/api', apiRouter);
    }

    start(cb) {
        if(this._server) {
            cb({
                error: 'Server already started'
            });
        } else {
            apiRouter.openDatabase((err) => {
                if(!err) {
                    this._server = this._app.listen(this.port, cb);
                }
            });
        }
    }

    stop() {
        if(!this._server) {
            cb({
                error: 'Server hasn\'t started yet'
            });
        } else {
            apiRouter.closeDatabase(() => {
                this._server.close(() => {
                    this._server = null;
                    cb();
                });
            });
        }
    }

    get port() {
        return this._port;
    }

    set port(port) {
        if(this._server) {
            throw {
                error: 'Server is still running'
            }
        } else {
            this._port = port;
        }
    }
}

module.exports = Server;