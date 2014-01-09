# esindexdump

A command line tool for dumping out an elasticsearch index in a format 
suitable for bulk (re)indexing.


## Example

```
$ esindexdump 'http://localhost:9200/twitter'
{"index":{"_type":"tweet","_id":"3"}}
{"user":"kimchy","post_date":"2009-11-15T14:12:12","message":"trying out Elastic Search"}
{"index":{"_type":"tweet","_id":"7"}}
{"user":"clintongormley","post_date":"2009-11-15T14:14:22","message":"fun!"}
{"index":{"_type":"tweet","_id":"6"}}
{"user":"elasticsearch","post_date":"2009-11-15T14:14:02","message":"try me out"}
...
$ esindexdump 'http://localhost:9200/twitter' > tweets.dump
$ curl -XPOST 'http://localhost:9200/twitter2' --data-binary @tweets.dump
{"index":{"_index":"twitter2","_type":"tweet","_id":"3","_version":1,"ok":true}},{"ind...
$
```


## Install

```
npm install -g esindexdump
```
