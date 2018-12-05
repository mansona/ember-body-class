'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('existing-body', function() {
  setupTest('fastboot-existing-body-class'/*, options */);

  it('has the yolo class', async function() {
    const { jQuery: $ } = await this.visit('/')

    const classes = $('body').attr('class').split(' ');
    expect(classes).to.include('yolo');
    expect(classes).to.include('super-face');
  })

  it('does not have null class', async function() {
    const { jQuery: $ } = await this.visit('/')

    const classes = $('body').attr('class').split(' ');

    expect(classes).to.not.include('null');
    expect(classes).to.include('super-face');
  })

});
