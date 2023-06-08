const json={} 
exports.setHeader = function(params) {
    json.status = params
}

exports.setResult = function(params) {
    json.body = params
}

exports.getJosn = () => json