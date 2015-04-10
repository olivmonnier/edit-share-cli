module.exports = function() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        frontend_path: '/frontend/app',
        scripts_path: '/frontend/app/scripts',
        styles_path: '/frontend/app/styles'
      };

    case 'production':
      return {
        frontend_path: '/frontend/dist',
        scripts_path: '/frontend/dist/scripts',
        styles_path: '/frontend/dist/styles'
      };

    default:
      return {
        frontend_path: '/frontend/dist',
        scripts_path: '/frontend/dist/scripts',
        styles_path: '/frontend/dist/styles'
      };
  }
};
