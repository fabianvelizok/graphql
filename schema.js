const casual = require('casual');
const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require('graphql-tools')


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
    courses: [Course]
    teachers: [Teacher]
    course(id: Int): Course
    teacher(id: Int): Teacher
  }
`

const resolvers = {
  Query: {
    courses: () => {
      return [
        {
          id: 1,
          title: 'Grahpql course',
          description: 'Learning graphql'
        },
        {
          id: 2,
          title: 'Node.js course',
          description: 'Learning Node!'
        }
      ]
    },
    teachers: () => {
      return [{
        id: 1,
        name: 'John',
        country: 'Spain'
      }]
    }
  },
  Course: {
    teacher: () => {
      return {
        id: 1,
        name: 'John',
        country: 'Spain'
      }
    },
    comments: () => {
      return [
        {
          id: 1,
          name: 'Michael',
          body: 'Great course.'
        },
        {
          id: 2,
          name: 'Joel',
          body: 'Excellent'
        }
      ]
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

addMockFunctionsToSchema({
  schema,
  mocks: {
    Course: () => {
      return {
        id: casual.integer(from = 1, to = 100),
        title: casual.title,
        description: casual.short_description
      }
    },
    Teacher: () => {
      return {
        id: casual.integer(from = 1, to = 100),
        name: casual.full_name,
        country: casual.country
      }
    },
    Comment: () => {
      return {
        id: casual.integer(from = 1, to = 100),
        name: casual.full_name,
        description: casual.description
      }
    }
  },
  preserveResolvers: false // If it's true, it uses resolvers instead of mocks
})

module.exports = schema
