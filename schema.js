const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  # This is a course. It belongs to a teacher
  type Course {
    id: ID!
    title: String!
    description: String!
    teacher: Teacher
    rating: Float @deprecated(reason: "No longer used")
    # Course comments
    comments: [Comment]
  }

  # This is a teacher. It has many courses
  type Teacher {
    id: ID!
    name: String!
    country: String!
    gender: Gender
    courses: [Course]
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Comment {
    id: ID!
    # Author name
    name: String!
    body: String!
  }

  type Query {
    Courses: [Course]
    Teachers: [Teacher]
    course(id: Int): Course
    teacher(id: Int): Teacher
  }
`

const schema = makeExecutableSchema({
  typeDefs
})

module.exports = schema
