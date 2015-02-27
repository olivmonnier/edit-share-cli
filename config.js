module.exports = function() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        frontend_path: 'frontend/app'
      };

    case 'production':
      return {
        frontend_path: 'frontend/dist'
      };

    default:
      return {
        frontend_path: 'frontend/dist'
      };
  }
};
