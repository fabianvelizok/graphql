module.exports = `
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

  input NewTeacher {
    name: String!,
    country: String!,
    gender: Gender
  }
`
