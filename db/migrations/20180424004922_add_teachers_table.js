exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('teachers', (table) => {
      table.increments('id').primary().unsigned()
      table.string('name')
      table.string('country')
      table.string('gender')
    })
  ])
)

exports.down = (knex, Promise) => (
  Promise.all([
    knex.schema.dropTable('teachers')
  ])
)
