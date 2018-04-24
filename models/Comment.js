const { Model } = require('objection')
const path = require('path')

class Comment extends Model {
  static get tableName () {
    return 'comments'
  }

  static get relationMappings () {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Course'),
        join: {
          from: 'comments.course_id',
          to: 'courses.id'
        }
      }
    }
  }
}

module.exports = Comment
