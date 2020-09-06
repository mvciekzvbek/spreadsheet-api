import { validate as uuidValidate } from 'uuid';

export default function validateUuid(req, res, next) {
  const sendBadRequest = () => {
    res.status(400).send({
      message: 'UUID is not valid'
    });
  };

  const { uuid } = req.params;

  if (!uuid) {
    return sendBadRequest();
  }
  const isValidUuid = uuidValidate(uuid);

  if (!isValidUuid) {
    return sendBadRequest();
  }

  return next();
}
