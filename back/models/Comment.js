const CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Comment = mongoose.model('Comment', CommentSchema);