import { validate as uuidValidate } from 'uuid';

export default function validateUuid(req, res, next) {
  const sendBadRequest = () => res.sendStatus(400);

  const { uuid } = req.params;

  if (!uuid) {
    sendBadRequest();
  }
  const isValidUuid = uuidValidate(uuid);

  if (!isValidUuid) {
    sendBadRequest();
  }

  next();
}
