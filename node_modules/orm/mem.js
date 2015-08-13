var async    = require('async');
var orm      = require('./lib/ORM.js');
var heapdump = require('heapdump');


function mem() {
  console.log("memory", Math.round(process.memoryUsage().rss / 1048576) + ' MiB');
}

function Wabbit () {
}

function connect (time, cb) {
  var obj = new Wabbit();

  orm.connect({
    protocol : "postgresql",
    timezone : 'Z',
    user     : "orm_testing",
    password : "38yzwnsdtrikguhz4sfdo",
    database : "orm_testing",
    query    : { pool: false }
  }, function (err, db) {
    if (err) return cb(err);

    db.settings.set('instance.cache', false);

    var model = db.define('country',
      {
        id:   { type: 'serial', key: true },
        code: { type: 'text' },
        name: { type: 'text' }
      }
    );
    model.find({ code: 'AU' }, function (err, result) {
      if (err) return cb(err)

      db.close()
      cb()
    });
  });
}

mem();
console.log("starting..");

async.timesSeries(10000, connect, function (err) {
  if (err) throw err;

  mem();
  for (var a = 0; a < 100; a++) {
    global.gc();
  }
  mem();
  heapdump.writeSnapshot('heap-' + Date.now() + '.heapsnapshot');

  console.log("done");
});
