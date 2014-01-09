var http = require('http')
var url = require('url')

var u = url.parse(process.argv[2])
var scrollU = url.parse(process.argv[2])
var scrollId;

u.path = u.path + '/_search?search_type=scan&scroll=10m&size=50'

scrollU.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
scrollU.path = '/_search/scroll?scroll=10m'

http.request(u, function (res) {
  var data = ''
  res.on('data', function (chunk) {data += chunk})
  res.on('end', function () {
    scrollId = JSON.parse(data)._scroll_id
    scrollU.headers['Content-Length'] = Buffer.byteLength(scrollId)
    scroll()
  })
}).on('error', function (e) {
  throw e
}).end('{"query":{"match_all":{}}}')

function scroll () {
  http.request(scrollU, function (res) {
    var data = ''
    res.on('data', function (chunk) {data += chunk})
    res.on('end', function () {
      var result = JSON.parse(data)
      if (!result.hits.hits.length) return
      result.hits.hits.forEach(function (doc) {
        console.log(JSON.stringify({
          index: {
            _type: doc._type,
            _id: doc._id
          }
        }))
        console.log(JSON.stringify(doc._source))
      })
      scroll()
    })
  }).on('error', function (e) {
    throw e
  }).end(scrollId)
}
