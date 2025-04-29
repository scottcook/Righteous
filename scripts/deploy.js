const fs = require('fs');
const path = require('path');

async function deploy() {
  try {
    // Get the site ID from environment variable
    const siteId = process.env.WEBFLOW_SITE_ID;
    
    if (!siteId) {
      throw new Error('WEBFLOW_SITE_ID environment variable is not set');
    }

    // Read the bundled file
    const bundlePath = path.join(__dirname, '../dist/bundle.js');
    const bundleContent = fs.readFileSync(bundlePath, 'utf8');

    // Update the CDN URL in your Webflow site settings
    console.log('Deployment complete! Update your Webflow site with this CDN URL:');
    console.log(`https://cdn.jsdelivr.net/gh/scottcook/Righteous@${process.env.npm_package_version}/dist/bundle.js`);
    
    // Optional: Trigger Webflow publish
    console.log('Publishing Webflow site...');
    
    // Use MCP connection to publish the site
    const publishResponse = await fetch(`/api/webflow/sites/${siteId}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domains: ['custom']
      })
    });

    if (!publishResponse.ok) {
      throw new Error('Failed to publish Webflow site');
    }

    console.log('Webflow site published successfully!');

  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy(); 