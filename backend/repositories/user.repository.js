const BaseRepository = require('./base.repository');
const User = require('../models/User.model');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  findByEmail(email) {
    return this.model.findOne({ email });
  }
}

module.exports = new UserRepository();
