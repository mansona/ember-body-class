/* eslint-disable ember/no-jquery */
'use strict';

const expect = require('chai').expect;
const setupTest = require('ember-fastboot-addon-tests').setupTest;

describe('index', function() {
  setupTest('fastboot'/*, options */);

  it('renders', async function() {
    const { jQuery: $, response } = await this.visit('/')

    expect(response.statusCode).to.equal(200);
    expect($('body').length).to.equal(1);
    expect($('h1').text().trim()).to.equal('ember-fastboot-addon-tests');
  });

  it('has the yolo class', async function() {
    const { jQuery: $ } = await this.visit('/')

    const classes = $('body').attr('class').split(' ');
    expect(classes).to.include('yolo');
  })

  it('does not have null class', async function() {
    const { jQuery: $ } = await this.visit('/')

    const classes = $('body').attr('class').split(' ');

    expect(classes).to.not.include('null');
  })

});
