function error(code, message){
    return  {'code': code, 'message': message};
}

function only_error(code, message){
    return  {
        'error':{
            'code': code,
            'message': message
        }
    };
}

exports.error = error;
exports.only_error = only_error;
