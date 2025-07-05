require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Only listen locally (not needed in Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel (Serverless Functions)
module.exports = app;