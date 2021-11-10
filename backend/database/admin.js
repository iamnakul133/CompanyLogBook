import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  email: { type: String },
  password: { type: String },
});

adminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};
export default mongoose.model("Admin", adminSchema);
