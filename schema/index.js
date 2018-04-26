const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Course = require('./Course')
const Teacher = require('./Teacher')

const rootQuery = `
  union searchResult = Teacher | Course

  type Query {
    courses: [Course]
    teachers: [Teacher]
    course(id: Int): Course
    teacher(id: Int): Teacher
    search(query: String!): [searchResult]
  }

  type Mutation {
    teacherAdd(newTeacher: NewTeacher): Teacher
    teacherUpdate(teacherId: Int!, teacherParams: TeacherParams): Teacher
    teacherDelete(teacherId: Int!): Teacher
    courseAdd(newCourse: NewCourse): Course
    courseUpdate(courseId: Int!, courseParams: CourseParams): Course
    courseDelete(courseId: Int!): Course
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Course, Teacher],
  resolvers
})

module.exports = schema
