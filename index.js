const express = require("express")
const config = require("./config.json")
const splash = require("./assets/splash.json")
const logger = require("./modules/Logger.js")
const app = express()

// initialization
if (config.port == "env" || process.argv[2] == "--use-env-port") config.port = process.env.PORT //as of now this is a working solution because no other launch options exist
app.use(function(req, res, next) {
	const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress
	logger.debug(`Request from ${ip} for ${req.url}`)
	next()
})
console.log(splash.splash)

// endpoints
app.get("/getWeapon/:weapon", require("./endpoints/getWeapon.js"))

// handle errors
app.use(function(req, res, next) {
	res.status(404).json({ code: "NOTFOUND", error: req.url+" was not found on this server."})
})
app.use(function(err, req, res, next) {
	res.status(500).send({ code: "INTERNALERROR", error: "An internal server occured." })
	logger.error("Internal server error occured: "+err)
})

app.listen(config.port, () => {
	logger.log("Server now running on port "+config.port)
}) 