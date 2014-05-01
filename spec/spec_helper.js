global._ = require('underscore');
var chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();
chai.use(require('chai-fuzzy'));
require('../dist/utilities');
require('../dist/object');
require('../dist/array');
require('../dist/string');
