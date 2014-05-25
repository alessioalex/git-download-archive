"use strict";

var debug = require('debug')('git-download-archive');
var gitSpawnedStream = require('git-spawned-stream');
var extend = require('xtend');

function archive(repoPath, opts) {
  var opts = opts || {};

  var defaults = {
    rev    : 'HEAD',
    format : 'tar', // zip
    prefix : 'repo/'
  };

  opts = extend(defaults, opts);

  var args = ['archive', '--format=' + opts.format, '--prefix=' + opts.prefix, opts.rev];

  // TODO: implement limit?
  return gitSpawnedStream(repoPath, args);
}

module.exports = archive;
