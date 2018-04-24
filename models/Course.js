const { Model } = require('objection')
const path = require('path')

class Course extends Model {
  static get tableName () {
    return 'courses'
  }

  static get relationMappings () {
    return {
      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Teacher'),
        join: {
          from: 'courses.teacher_id',
          to: 'teachers.id'
        }
      },
      comentarios: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, '/Comment'),
        join: {
          from: 'courses.id',
          to: 'comments.course_id'
        }
      }
    }
  }
}

module.exports = Course
