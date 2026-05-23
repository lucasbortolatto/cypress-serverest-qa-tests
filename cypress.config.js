const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    apiUrl: 'https://serverest.dev',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeout configurations
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    
    // Test configurations
    watchForFileChanges: false,
    video: false,
    screenshotOnRunFailure: true,
    
    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
});
