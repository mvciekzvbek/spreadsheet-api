import loggerProvider from '../providers/LoggerProvider';

export default function log(req, res, next) {
  loggerProvider.info(`
    id=[${req.id}]\
    method=${req.method}\
    startTime=[${req.time.toUTCString()}]\
    originalUrl=${req.originalUrl}\
    referer=${req.headers.referer}\
    user-agent=${req.headers['user-agent']}`);

  res.on('finish', () => {
    loggerProvider.info(`
        id=[${req.id}]\
        statusCode=${res.statusCode}\
        statusMessage=${res.statusMessage}\
        processTime=${Date.now() - req.time.getTime()}\
        ${res.get('Content-Length') || 0}b sent`);
  });

  next();
}
