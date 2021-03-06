var sys = require("sys");

exports.Problem = function(opts) {
    this.id = opts['_id'] || opts.id;
    this.rev = opts['_rev'] || opts.rev;
    this.name = opts.name;
    this.status = opts.status || 'queued';
    this.created_at = opts.created_at || (new Date().getTime());
    
    if (opts.map_function) {
        opts.map_function = opts.map_function.replace(/\n/g, "\n"); // hackety hack
        opts.map_function = opts.map_function.replace(/\r/g, "\r"); // hackety hack
        opts.map_function = opts.map_function.replace(/\t/g, "\r"); // hackety hack
    }
    this.map_function = opts.map_function;
    if (opts.reduce_function) {
        opts.reduce_function = opts.reduce_function.replace(/\n/g, "\n"); // hackety hack
        opts.reduce_function = opts.reduce_function.replace(/\r/g, "\r"); // hackety hack
        opts.reduce_function = opts.reduce_function.replace(/\t/g, "\r"); // hackety hack
    }
    this.reduce_function = opts.reduce_function;

	this.data = "";
    if (opts.data) {
        if (typeof opts.data === 'string') {
            opts.data = opts.data.replace(/\n/g, "\n"); // hackety hack
            opts.data = opts.data.replace(/\r/g, "\r"); // hackety hack
            opts.data = opts.data.replace(/\t/g, "\r"); // hackety hack
            try {
				this.data = JSON.parse(opts.data)
			} catch(e) {
				this.data = opts.data;
			}
		} else { // already JSON
            this.data = opts.data;
        }
    }
    this.type = 'problem';
    this.errors = [];
};
exports.Problem.prototype = {
    validate: function () {
        if (!this.name || this.name.trim() == '') {
            this.errors.push({field: 'name', message: "Problem Name can't be blank"})
        }
        if (!this.map_function || this.map_function.trim() == '') {
            this.errors.push({field: 'map_function', message: "Map Function can't be blank"})
        }
        if (!this.reduce_function || this.reduce_function.trim() == '') {
            this.errors.push({field: 'reduce_function', message: "Reduce Function can't be blank"})
        }
        return !this.has_errors();
    },
    has_errors: function() {
        return this.errors.length != 0;
    },
    has_error: function(field_name) {
        return _.any(this.errors, function (item) { return item.field == field_name; }, field_name);
    }
};
