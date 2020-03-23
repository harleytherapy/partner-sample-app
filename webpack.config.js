module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  }
};