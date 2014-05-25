"use strict";

var proxyquire = require('proxyquire');
var should = require('should');

describe('git-download-archive', function() {
  it('should delegate correctly', function(done) {
    var repoPath = '/home/node.git';
    var opts = {
      rev: 'master',
      format: 'zip',
      prefix: 'node'
    }
    var gitDownloadArchive = proxyquire.load('./', {
      'git-spawned-stream': function(path, args) {
        path.should.eql(repoPath);
        args.should.eql(['archive', '--format=' + opts.format, '--prefix=' + opts.prefix, opts.rev]);

        done();
      }
    });

    gitDownloadArchive(repoPath, opts);
  });
});
