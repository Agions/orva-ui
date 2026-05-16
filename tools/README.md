# orva-ui CLI Tools Guide

## Quick Start

Install CLI tool:
```bash
npm install -g orva-ui-cli
```

### Common Commands:

**Initialize Project:**
```bash
orva-ui init --name=my-orva-ui-app
cd my-orva-ui-app
npm run dev
```

**Create Component:**
```bash
orva-ui create --name=MyButton --type=basic
orva-ui create --name=CustomInput --type=form
```

**Development:**
```bash
orva-ui dev          # Start dev server
orva-ui build        # Build project
orva-ui test         # Run tests
```

## Template Types:

- **basic**: Basic UI components (buttons, cards, etc.)
- **form**: Form input components (inputs, selectors, etc.)

## Learning Resources:

- [Component Templates](TEMPLATE_GUIDE.md)
- [Professional Summary](PROFESSIONAL_SUMMARY.md)

**Version**: orva-ui v1.0.0 CLI