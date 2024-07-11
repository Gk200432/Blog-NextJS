import { model, models, Schema } from 'mongoose';

const postSchema = new Schema({
  title: String,
  description: String,
  image: String,
  created_at: String
}, { toJSON: { virtuals: true } });

postSchema.virtual('short_description').get(function () {
  return this.description ? this.description.substr(0, 100) + '......' : '';
});

postSchema.virtual('created_at_format').get(function () {
  return changeFormat(this.created_at || ''); 
});

function changeFormat(date_str: string): string {
  if (!date_str) return ''; 

  const date = new Date(date_str);
  const month = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return `${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

const PostModel = models.Post || model('Post', postSchema);

export default PostModel;
