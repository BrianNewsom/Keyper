module.exports = {
	protocol: "mongodb",
	host: "ds035563.mongolab.com",
	user: process.env['MONGODB_USER'],
	password: process.env['MONGODB_PASSWORD'],
	name: "keyper",
	port: "35563",
	url: function() { return this.protocol + "://" + this.user + ":" + this.password + "@" + this.host + ":" + this.port + "/" + this.name }
}