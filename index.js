var fs = require('fs')

module.exports = function (input, output, cb) {
  fs.readFile(input, function (err, data) {
    if (err && cb) return cb(err)
    var original = String(data)
    var converted = String(data)
    original.split('\n').forEach(function (line) {  
      var regex = line.match(/[^(\]\))]*?\.(png|jpg)/)
	  console.log(regex)
	  if (regex) {
        var file = regex[0]
        var im = fs.readFileSync(file)
        var src = 'data:image/png;base64,' + im.toString('base64')
        var insert = '<img src="' + src + '" />'
        converted = converted.replace(line, insert)
      }
    })
    if (output) fs.writeFile(output, converted, function (err, data) {
      if (err && cb) return cb(err)
      if (cb) return cb()
    })
    else console.log(converted)
  })
}
