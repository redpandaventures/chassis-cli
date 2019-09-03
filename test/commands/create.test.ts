import {expect, test} from '@oclif/test'

describe('create', () => {
  test
    .stdout()
    .command(['create', 'help'])
    .exit(0)
    .it('runs create help', ctx => {
      expect(ctx.stdout).to.contain('a new Chassis project')
    })
})
