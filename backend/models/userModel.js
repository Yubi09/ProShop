import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  // matchPassword is a method of the userSchema
  // bcrypt.compare returns a promise
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  // pre is a middleware
  // this is the user object
  // if the password is not modified, we don't want to run this middleware
  if (!this.isModified('password')) {
    next();
  }
  // if the password is modified, we want to hash it
  const salt = await bcrypt.genSalt(10); // generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt); // hash the password with the salt
});

const User = mongoose.model('User', userSchema); // User is the name of the model

export default User;
