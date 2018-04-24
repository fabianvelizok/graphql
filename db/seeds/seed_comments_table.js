const casual = require('casual')

exports.seed = (knex, Promise) => {
  return knex('comments').del().then(() => {
    const promises = Array(40).fill().map((_, id) => {
      return knex('comments').insert([{
        id,
        name: casual.name,
        body: casual.sentences(2),
        course_id: casual.integer(1, 10)
      }])
    })

    return Promise.all(promises)
  })
}
