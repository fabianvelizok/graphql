const casual = require('casual');
const { Course, Teacher } = require('./models')
const { raw } = require('objection')

const resolvers = {
  Query: {
    courses: () => Course.query().eager('[teacher]'), // @FIXME: Comment relationship
    teachers: () => Teacher.query().eager('[courses]'),
    course: (rootValue, args) => Course.query().eager('[teacher]').findById(args.id), // @FIXME: Comment relationship
    teacher: (_, args) => Teacher.query().eager('[courses]').findById(args.id),
    search: async (_, args) => {
      const query = args.query.toLowerCase();
      const teachers = await Teacher.query()
                                    .where(raw('lower("name")'), 'like', `%${query}%`);
      const courses = await Course.query()
                                  .where(raw('lower("title")'), 'like', `%${query}%`);
      return [
        ...teachers, ...courses
      ]
    }
  },
  searchResult: {
    __resolveType: (result, context, info) => {
      return result.name ? 'Teacher' : 'Course';
    }
  },
  Mutation: {
    teacherAdd: (_, args) => {
      return Teacher.query().insert(args.newTeacher)
    },
    teacherUpdate: (_, args) => {
      return Teacher.query().patchAndFetchById(args.teacherId, args.teacherParams);
    },
    teacherDelete: async (_, args) => {
      const id = args.teacherId;
      // Just to return the teacher that we are going to delete.
      const teacher = await Teacher.query().findById(id);
      const deletedRows = await Teacher.query().deleteById(id);
      if (deletedRows > 0) return teacher;
      throw new Error(`The teacher width id '${id}' was not deleted successfully.`)
    },
    courseAdd: (_, args) => {
      return Course.query().insert(args.newCourse)
    },
    courseUpdate: (_, args) => {
      return Course.query().patchAndFetchById(args.courseId, args.courseParams);
    },
    courseDelete: async (_, args) => {
      const id = args.courseId;
      const course = await Course.query().findById(id);
      const deletedRows = await Course.query().deleteById(id);
      if (deletedRows > 0) return course;
      throw new Error(`The course width id '${id}' was not deleted successfully.`)
    }
  }
}

module.exports = resolvers;
