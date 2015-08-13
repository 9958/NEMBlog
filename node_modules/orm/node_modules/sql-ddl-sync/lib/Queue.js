exports.Queue = Queue;

function Queue(cb) {
	this.pending = 0;
	this.cb      = cb;
}

Queue.prototype.add = function () {
	if (this.pending == -1) return;
	this.pending += 1;

	var args = Array.prototype.slice.apply(arguments);
	var fun  = args.pop();

	args.push(function (err) {
		if (this.pending == -1) return;
		if (err) {
			this.pending = -1;

			return this.cb(err);
		}
		if (--this.pending === 0) {
			return this.cb();
		}
	}.bind(this));

	fun.apply(null, args);

	return this;
};

Queue.prototype.check = function () {
	if (this.pending === 0) {
		return this.cb();
	}
};
