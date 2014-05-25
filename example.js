"use strict";

var streamGitArchive = require('./');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));
var fs = require('fs');
var os = require('os');
var outPath = os.tmpdir() + '/repo.tar';
var out = fs.createWriteStream(outPath);

streamGitArchive(repoPath).on('end', function() {
  console.log('Done, checkout %s', outPath);
}).once('data', function() {
  console.log('Began streaming to %s', outPath);
}).on('error', function(err) {
  console.error(err.message);
  process.exit(1);
}).pipe(out);
