const casual = require('casual');
const { Course, Teacher } = require('./models')

const resolvers = {
  Query: {
    courses: () => Course.query().eager('[teacher]'), // @FIXME: Comment relationship
    teachers: () => Teacher.query().eager('[courses]'),
    course: (rootValue, args) => Course.query().eager('[teacher]').findById(args.id), // @FIXME: Comment relationship
    teacher: (rootValue, args) => Teacher.query().eager('[courses]').findById(args.id)
  },
  Mutation: {
    teacherAdd: (_, args) => {
      return Teacher.query().insert(args.newTeacher)
    },
    teacherUpdate: (_, args) => {
      return Teacher.query().patchAndFetchById(args.teacherId, args.teacherParams);
    }
  }
}

module.exports = resolvers;
