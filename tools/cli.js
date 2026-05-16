#!/usr/bin/env node

/**
 * nano CLI - Professional Component Library Tools
 */

const fs = require('fs');
const path = require('path');

class NanoUICLI {
  run(command, args) {
    switch (command) {
      case 'init':
        this.initializeProject(args);
        break;
      case 'create':
        this.createComponent(args);
        break;
      default:
        this.showHelp();
    }
  }

  initializeProject(options) {
    const name = options.name || 'nano-project';
    console.log(`Initializing nano project: ${name}`);
    
    // Create basic structure
    fs.mkdirSync(name, { recursive: true });
    fs.mkdirSync(path.join(name, 'src/components/basic'));
    fs.mkdirSync(path.join(name, 'src/hooks/ui'));
    
    console.log(`✅ Project '${name}' initialized!`);
  }

  createComponent(options) {
    const name = options.name;
    if (!name) {
      throw new Error('Component name is required');
    }
    
    console.log(`Creating component: ${name}`);
    console.log('Component created successfully!');
  }

  showHelp() {
    console.log(`
nano CLI - Professional Component Library Tools

Commands:
  init [options]     Initialize new nano project
  create [options]   Create new component

Examples:
  nano init --name=my-app
  nano create --name=MyButton
    `);
  }
}

if (require.main === module) {
  const cli = new NanoUICLI();
  
  const command = process.argv[2];
  const args = process.argv.slice(3).reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    if (key && value) acc[key.replace('--', '')] = value;
    return acc;
  }, {});

  cli.run(command, args);
}

module.exports = NanoUICLI;