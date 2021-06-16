module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        // extraResources: ['src/extraResources']
      }
    }
  },
  // publicPath: process.env.BASE_URL,
  // assetsDir: process.env.BASE_URL
}