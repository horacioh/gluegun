// @command      generate saga
// @description  Generates a saga with an optional test.
const { isNilOrEmpty } = require('ramdasauce')
const { capsCase } = require('../shared/utils')

module.exports = async function (context) {
  // grab some features
  const { parameters, config, template } = context
  const { generate } = template

  // TODO: validation
  if (isNilOrEmpty(parameters.string)) return

  // read some configuration
  const { askToOverwrite, tests } = config.ignite

  // make a name that's FriendlyLikeThis and not-like-this
  const name = capsCase(parameters.first)
  const props = { name }

  // generate the saga
  await generate({
    template: 'templates/saga.njk',
    target: `App/Sagas/${name}Sagas.js`,
    props,
    askToOverwrite
  })

  // generate the appropriate test
  if (tests) {
    await generate({
      template: `templates/saga-test-${tests}.njk`,
      target: `Tests/Saga/${name}SagaTest.js`,
      props,
      askToOverwrite
    })
  }
}
