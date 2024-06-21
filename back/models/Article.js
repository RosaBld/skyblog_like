const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Article = mongoose.model('Article', ArticleSchema);