const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

// insert exact global.css file path
module.exports = withNativeWind(config, { input: './app/global.css' })