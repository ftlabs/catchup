# FT Labs catchup, aka Taxi Pack, aka lots of other names

Basic gist:

* read info from SAPI, and other services
* build a useful summary of a given time interval

See the home page for a list of all teh endpoints.

# end points

* /...

# Environment Parameters

When building locally, specify them in a local file, .env (and NB, this must not be included in the git repo, hence has a specific line in .gitignore). When deploying to Heroku, they need to be specified in the app's settings, Config Variables.

The following are mandatory params, the absence of which will kill the app on startup:

* TOKEN=...
* CAPI_KEY=...

optional params

These are for local builds:

* DEBUG=correlations:\*,bin:lib:\*
