const LikeSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Like = mongoose.model('Like', LikeSchema);