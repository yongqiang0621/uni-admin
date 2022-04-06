const {
	uniPostcssPlugin
} = require('@dcloudio/uni-cli-shared')
module.exports = {
	plugins: [
		uniPostcssPlugin(),
		require('autoprefixer')(),
		{
			postcssPlugin: 'internal:charset-removal',
			AtRule: {
				charset: (atRule) => {
					if (atRule.name === 'charset') {
						atRule.remove()
					}
				}
			}
		}
	]
}
