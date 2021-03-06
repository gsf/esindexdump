# esindexdump

This is a command line tool that scrolls through records in an elasticsearch 
index and streams them out in a format suitable for bulk (re)indexing.

```sh
$ sudo npm install -g esindexdump
...
$ esindexdump http://localhost:9200/twitter
{"index":{"_type":"tweet","_id":"3"}}
{"user":"kimchy","post_date":"2009-11-15T14:12:12","message":"trying out Elastic Search"}
{"index":{"_type":"tweet","_id":"7"}}
{"user":"clintongormley","post_date":"2009-11-15T14:14:22","message":"fun!"}
{"index":{"_type":"tweet","_id":"6"}}
{"user":"elasticsearch","post_date":"2009-11-15T14:14:02","message":"try me out"}
...
$ # ldj file extension for line-delimited json
$ esindexdump http://localhost:9200/twitter > tweets.ldj
$ curl -XPOST http://localhost:9200/twitter2/_bulk --data-binary @tweets.ldj
{"index":{"_index":"twitter2","_type":"tweet","_id":"3","_version":1,"ok":true}},{"index":...
$ esindexdump http://localhost:9200/twitter | gzip > tweets.ldj.gz
$ # if http.compression is set to true in your elasticsearch config
$ curl -XPOST -H 'Content-Encoding: gzip' http://localhost:9200/twitter2/_bulk --data-binary @tweets.ldj.gz
{"index":{"_index":"twitter2","_type":"tweet","_id":"3","_version":1,"ok":true}},{"index":...
$ 
```

Now with an API for updating documents with a map/filter.

```js
var dump = require('esindexdump')

// Only dump docs of type "tweet", and set user on all to "alice"
dump({
  url: 'http://localhost:9200/test,
  out: process.stdout
}, function (err, doc) {
  if (err) return console.error(err)
  if (doc._type === 'tweet') {
    doc._source.user = 'alice'
    return doc
  }
})
```
