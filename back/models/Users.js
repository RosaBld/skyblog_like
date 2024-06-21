const UserSchema = new mongoose.Schema({
  username: String,
  mail: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});
const User = mongoose.model('User', UserSchema);