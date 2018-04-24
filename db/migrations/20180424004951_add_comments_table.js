exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('comments', (table) => {
      table.increments('id').primary().unsigned()
      table.string('name')
      table.string('body')
      table.integer('course_id').unsigned()
    })
  ])
)

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('comments')
  ])
)
