export default {
  async findOne(req, res, next) {
    console.log(req);
    res.sendStatus(200);
  },
};
