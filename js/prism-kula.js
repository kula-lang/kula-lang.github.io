Prism.languages.kula = Prism.languages.extend('clike', {
	'string': {
		pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
		greedy: true
	},
    'comment': /\#.*\n/,
	'keyword': /\b(?:if|else|while|func|return|type)\b/,
	'number': /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    'class-name': /(?:[A-Z]\w*(?=\.))/,
});