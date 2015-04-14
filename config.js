module.exports = function() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        frontend_path: '/frontend/app',
        scripts_path: '/frontend/app/scripts',
        styles_path: '/frontend/app/styles',
        fonts_path: '/frontend/app/fonts'
      };

    case 'production':
      return {
        frontend_path: '/frontend/dist',
        scripts_path: '/frontend/dist/scripts',
        styles_path: '/frontend/dist/styles',
        fonts_path: '/frontend/dist/fonts'
      };

    default:
      return {
        frontend_path: '/frontend/dist',
        scripts_path: '/frontend/dist/scripts',
        styles_path: '/frontend/dist/styles',
        fonts_path: '/frontend/dist/fonts'
      };
  }
};
