'use strict';


module.exports = function BindHost(opts) {
  opts = opts || {};
  if (!opts.hosts) {
    throw new TypeError('option must contain hosts');
  }

  let $all = false,
      hosts = opts.hosts;
 
  if (typeof hosts === 'string' && hosts !== '*') {
    hosts = [hosts];
  } else if (hosts === '*') {
    $all = true;
  }

  return function(req, res, next) {
    let headers = req['headers'],
        host = headers['host'] || headers['X-Forwarded-Host'];

    if ($all) {
      next();
    } else {
      if (hosts.indexOf(host) > -1) {
        next();
      } else {
        res.status(403).send(opts.warning || 'The domain name is not bound!');
      }
    }
  }
}