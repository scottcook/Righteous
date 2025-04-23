const { spawn } = require('child_process');

async function testWebflowMCP() {
    try {
        console.log('Starting Webflow MCP server...');
        console.log('Using token:', process.env.WEBFLOW_TOKEN ? 'Token is set' : 'Token is not set');
        
        const mcpServer = spawn('npx', ['-y', 'webflow-mcp-server@0.4.1'], {
            env: {
                ...process.env,
                WEBFLOW_TOKEN: 'acf8e929d620d21e0342b4e532cc9452aa36f664035e7a3182a298a21502d5dd'
            }
        });

        mcpServer.stdout.on('data', (data) => {
            console.log(`MCP Server output: ${data.toString()}`);
        });

        mcpServer.stderr.on('data', (data) => {
            console.error(`MCP Server error: ${data.toString()}`);
        });

        mcpServer.on('close', (code) => {
            console.log(`MCP Server process exited with code ${code}`);
            if (code !== 0) {
                console.error('MCP Server failed to start properly');
            }
        });

        // Keep the process running for a while to test the connection
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // Clean up
        mcpServer.kill();
        console.log('Test completed');

    } catch (error) {
        console.error('Error testing Webflow MCP:', error);
    }
}

testWebflowMCP(); 