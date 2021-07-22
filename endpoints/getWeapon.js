const fetch = require("node-fetch")
const logger = require("../modules/Logger.js")
const jsdom = require("jsdom")
const config = require("../config.json")
const { JSDOM } = jsdom

module.exports = function(req, res) {
	if (config.endpoints.getWeapon == false) {
		return res.status(501).json({code: "ENDPOINTDISABLED", error: "This endpoint is unavailable or disabled."})
	}
	if (!req.params.weapon) {
		return res.status(400).json({code: "MISSINGARG", error: "You need to provide a weapon name."})
	}
	
	var result = {}
	let search = req.params.weapon
			.replace(/[^0-9a-z- ]/gi, "") // only keep alphanumerics
			.trim()
			.replace(" ", "_") // replace spaces with underscores to keep it URL-safe
		
	if (search == "") {
		return res.status(400).json({code: "BADARG", error: "The search term resulted in a blank string. This usually happens when the string only consists of non-alphanumeric characters."})
	}
	
	fetch("https://wiki.teamfortress.com/wiki/"+search)
			.then(res => res.text())
			.then(text => {
				const dom = new JSDOM(text)
				
				result.url = "https://wiki.teamfortress.com/wiki/"+search
				result.name = dom.window.document.getElementById("firstHeading").textContent
				result.content = dom.window.document.querySelector("p").textContent
				
				if (result.content.startsWith("There is currently no text in this page.")) {
					return res.status(404).json({code: "WIKINOTFOUND", error: search+" wasn't found on the wiki, or it isn't public."})
				}
				
				const img = dom.window.document.querySelector("img").src
				if (img) result.image = img
				
				// weapon stats
				result.stats = []
				for (const stat of dom.window.document.getElementsByClassName("att_positive")) {
					if (!result.stats.includes(["POSITIVE", stat.textContent])) {
						result.stats.push(["POSITIVE", stat.textContent])
					}
				}
				
				for (const stat of dom.window.document.getElementsByClassName("att_negative")) {
					if (!result.stats.includes(["NEGATIVE", stat.textContent])) {
						result.stats.push(["NEGATIVE", stat.textContent])
					}
				}
				
				for (const stat of dom.window.document.getElementsByClassName("att_neutral")) {
					if (!result.stats.includes(["NEUTRAL", stat.textContent])) {
						result.stats.push(["NEUTRAL", stat.textContent])
					}
				}
				
				// get info
				for (const i of dom.window.document.getElementsByClassName("infobox-data")) {
					if (i.textContent.search("Patch") != -1) {
						result.release = i.textContent
					}
				}
				
				for (const i of dom.window.document.getElementsByClassName("infobox-label")) {
					if (i.textContent.search("Availability") != -1) {
						result.availability = i.nextSibling.textContent
					}
				}
				
				res.status(200).json(result)
			})
			.catch(error => {
				res.status(502).json({ code: "WIKIERROR", message: "An unknown error occured while trying to contact the TF2 wiki." })
				logger.error("Fetch error: "+error)
			})
}