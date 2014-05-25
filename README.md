# git-download-archive

Get a tar/zip archive stream from a git repository (at a certain commit).

## Usage

```js
// returns a stream
gitDownloadArchive(repoPath, options)
```

Options param defaults to:

```js
{
  rev    : 'HEAD',
  format : 'tar', // zip
  prefix : 'repo/'
}
```

Example:

```js
var streamGitArchive = require('git-download-archive');
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
```

## Tests

```
npm test
```

## License

MIT
