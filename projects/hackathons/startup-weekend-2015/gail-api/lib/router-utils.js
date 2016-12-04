function makeJSONResponse(res, status, messageKey, message) {
    let json = {
        status: status
    };

    // Curry the parameters
    if(!messageKey && !message && status && typeof status == 'string') {
        message = status;
        messageKey = 'message';
        status = 200;
    } else if(!message && messageKey) {
        message = messageKey;
        messageKey = 'message';
    }

    if(status >= 400 && status < 600) {
        json.error = message;
    } else {
        json[messageKey] = message;
    }

    res.status(status).json(json);
}

module.exports = {
    makeJSONResponse: makeJSONResponse
};