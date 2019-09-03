import {expect, test} from '@oclif/test'

describe('create', () => {
  test
    .stdout()
    .command(['help', 'create'])
    .it('runs create help', ctx => {
      expect(ctx.stdout).to.contain('a new Chassis project')
    })
})
