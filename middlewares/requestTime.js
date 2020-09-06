export default function addTimeStamp(req, res, next) {
  req.time = new Date();
  next();
}
