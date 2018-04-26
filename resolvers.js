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
    },
    teacherDelete: async (_, args) => {
      // Just to return the teacher that we are going to delete.
      const teacherToDelete = await Teacher.query().findById(args.teacherId);
      await Teacher.query().deleteById(args.teacherId);
      return teacherToDelete;
    },
    courseAdd: (_, args) => {
      return Course.query().insert(args.newCourse)
    },
    courseUpdate: (_, args) => {
      return Course.query().patchAndFetchById(args.courseId, args.courseParams);
    },
    courseDelete: async (_, args) => {
      const courseToDelete = await Course.query().findById(args.courseId);
      await Course.query().deleteById(args.courseId);
      return courseToDelete;
    }
  }
}

module.exports = resolvers;
