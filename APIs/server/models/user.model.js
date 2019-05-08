const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select: false
  }
});

UserSchema.pre('save', function save(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err1, hash) => {
      if (err1) return next(err1);
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function comparePassword(passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
