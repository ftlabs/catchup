// This module makes use of 'node-fetch' to acces SAPI

const debug = require('debug')('bin:lib:catchup');
const fetchContent = require('./fetchContent');

function fetchBasic(params) {
	const nowSecs = Math.floor( Date.now() / 1000 );
	const defaultParams = {
		beforeSecs    : nowSecs,
		afterSecs     : nowSecs - (24 * 60 * 60),
		entities      : [],
		constraintsOr : [],
		constraints   : [],
	};
	const combinedParams = Object.assign({}, defaultParams, params);
	return fetchContent.searchUnixTimeRange(combinedParams.afterSecs, combinedParams.beforeSecs, combinedParams)
}

module.exports = {
	fetchBasic
};
