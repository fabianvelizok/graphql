module.exports = `
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

  type Comment {
    id: ID!
    # Author name
    name: String!
    body: String!
  }

  input NewCourse {
    title: String!
    description: String!
  }

  input CourseParams {
    title: String
    description: String
  }
`
