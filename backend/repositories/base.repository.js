class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create(data);
  }

  findById(id, projection = null, options = {}) {
    return this.model.findById(id, projection, options);
  }

  findOne(filter, projection = null, options = {}) {
    return this.model.findOne(filter, projection, options);
  }

  find(filter = {}, projection = null, options = {}) {
    return this.model.find(filter, projection, options);
  }

  findOneAndUpdate(filter, update, options = {}) {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
      ...options,
    });
  }

  updateById(id, update, options = {}) {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      ...options,
    });
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
