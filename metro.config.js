const crypto = require.resolve('crypto-browserify');
const url = require.resolve('url/');

const { getDefaultConfig } = require('expo/metro-config');



module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg' && ext !== 'scss'),
    sourceExts: [...resolver.sourceExts, 'svg', 'scss', 'sass'],
    extraNodeModules: {
      crypto,
      url,
      fs: require.resolve('expo-file-system'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      net: require.resolve('react-native-tcp'),
      os: require.resolve('os-browserify/browser.js'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('readable-stream'),
      vm: require.resolve('vm-browserify'),
    },
  };

  return config;
})();


// module.exports = {
//   resolver: {
//     extraNodeModules: {
//       crypto,
//       url,
//       fs: require.resolve('expo-file-system'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       net: require.resolve('react-native-tcp'),
//       os: require.resolve('os-browserify/browser.js'),
//       path: require.resolve('path-browserify'),
//       stream: require.resolve('readable-stream'),
//       vm: require.resolve('vm-browserify'),
//     },
//   },
// };