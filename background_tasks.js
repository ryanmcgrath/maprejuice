var cron = require('cron'),
    sys = require('sys'),
    _ = require('./lib/underscore')._,
    Problem = require('./models/problem').Problem,
    Job = require('./models/job').Job,
    dataa = require('./models/data_abstraction');

exports.backgroundTasks = [];

exports.backgroundTasks.push(
        new cron.CronJob('* * * * 0,10,20,30,40,50 0', function() {
            sys.puts('You will see this message every minute');
            dataa.getOldTasksWithoutResults(function (job) {
                sys.puts("hit this");
            });
        })
);