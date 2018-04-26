const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Course = require('./Course')
const Teacher = require('./Teacher')

const rootQuery = `
  type Query {
    courses: [Course]
    teachers: [Teacher]
    course(id: Int): Course
    teacher(id: Int): Teacher
  }

  type Mutation {
    teacherAdd(newTeacher: NewTeacher): Teacher
    teacherUpdate(teacherId: Int!, teacherParams: TeacherParams): Teacher
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Course, Teacher],
  resolvers
})

module.exports = schema
