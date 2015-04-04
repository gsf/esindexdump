#!/usr/bin/env node

var docStream = require('elasticsearch-doc-stream')

function dump (opt, cb) {
  var d = docStream({
    url: opt.url,
    search: {
      query: {
        match_all: {}
      }
    }
  });

  d.on('data', function (doc) {
    doc = cb(null, doc)
    if (!doc) return
    opt.out.write(JSON.stringify({
      index: {
        _type: doc._type,
        _id: doc._id
      }
    }) + '\n')
    opt.out.write(JSON.stringify(doc._source) + '\n')
  });

  d.on('error', function (err) {
    cb(err);
  });
}

module.exports = dump

if (require.main === module) dump({
  url: process.argv[2],
  out: process.stdout
}, function (err, doc) {
  if (err) return console.error(err)
  return doc
})
