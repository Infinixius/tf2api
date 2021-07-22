---
title: tf2api
---

# tf2api

A web API for parsing the Team Fortress 2 wiki and getting relevant information from it.

A version is hosted at `https://tf2api.herokuapp.com`. Keep in mind this is hosted on Heroku's free tier, and may not always be up.

This is just a project I made when I was bored overseas. It shouldn't really be used for anything serious, but hopefully someday someone may find it useful.

# Installation

You're going to need any version of [Node.js](https://nodejs.org) higher than 14, along with [NPM](https://www.npmjs.com) (which should come with node anyway.)

If you have [git](https://git-scm.com) already, you can run `git clone https://github.com/infinixius/tf2api` to get a local copy of the code. If you don't, you can use the "Download Code" button.

Finally, run `npm install` where the repository is to install all the NPM modules needed.

Rename `config.template.json` to `config.json`. This is used for configuring the server and an explanation can be found `docs/Config.md` or at `https://infinixius.github.io/tf2api/Config`.

# Reference

## Errors

Any non 204/200 response code should come a helpful error code and message:

```
{
	"code": "MISSINGARG",
	"message": "You need to provide a weapon name."
}
```

A list of all possible error codes is provided below:

- **NOTFOUND** - Returned with any 404 Not Found response code.
- **WIKINOTFOUND** - Returned if a page doesn't exist on the wiki. Always returns a 404 Not Found response code.
- **MISSINGARG** - Missing any number of arguments. Always returns a 400 Bad Request response code.
- **BADARG** - An argument or multiple arguments passed were invalid. Always returns a 400 Bad Request response code.
- **ENDPOINTDISABLED** - Returned if the endpoint in question is disabled or otherwise unavailable. Always returns a 501 Not Implemented response code.
- **INTERNALERROR** - Returned upon any internal server error. Always returns a 500 Internal Sever Error response code.
- **WIKIERROR** - Returned if the request to the TF2 wiki failed. Always returns a 502 Bad Gateway error.

## `/getWeapon`

Takes a weapon name and searches the wiki for it, returning the result as a JSON object.

```
{
    url: url,
    name: string,
    content: string,
    image: url,
    stats: [
        ["POSITIVE", string],
        ["NEGATIVE", string],
        ["NEUTRAL", string]
    ],
    release: string,
    availability: string
    
}
```
Example: `https://tf2api.herokuapp.com/getWeapon/Phlogistinator`

## Planned endpoints

- **/resolve** - Resolves a string, such as "Flare gun" and returns what it is. In this example, "WEAPON" would be returned.
- **/getCosmetic** - Returns cosmetic information from the wiki
- **/getPatch** - Returns an update's patch notes. If no argument is provided, the latest patch notes are returned.
- **/getMap** - Returns information about a map
- **/getOwners** - Get a list of owners for specific items, such as Wiki Caps, Golden Wrenches, or Community quality items.

- **License** - [https://github.com/Infinixius/tf2api/blob/main/LICENSE](https://github.com/Infinixius/tf2api/blob/main/LICENSE)
- **Contact** - [https://infinixius.github.io](https://infinixius.github.io)
- **Credits** - [https://infinixius.github.io/tf2api/Credits](https://infinixius.github.io/tf2api/Credits)