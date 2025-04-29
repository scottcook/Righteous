# Righteous Webflow Project

This repository contains the custom code for the Righteous Webflow project, including GSAP animations and custom functionality.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/scottcook/Righteous.git
cd Righteous
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Webflow credentials:
```
WEBFLOW_SITE_ID=your_site_id
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Make changes to files in the `src` directory
3. The development server will automatically reload with your changes

## Code Style

- We use ESLint for code linting
- Prettier for code formatting
- Run `npm run format` before committing changes

## Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy to Webflow:
```bash
npm run deploy
```

## Branching Strategy

- `main` - Production branch, deploys to live site
- `staging` - Staging branch for testing
- Feature branches should be created from `staging` with the format: `feature/description`

## Collaboration Guidelines

1. Always create a new branch for features/fixes
2. Submit pull requests to `staging` branch
3. Pull requests require one review before merging
4. Keep commits atomic and write clear commit messages
5. Update documentation when making significant changes

## Webflow Integration

The project uses jsDelivr CDN for serving the bundled JavaScript file. The production URL format is:
```
https://cdn.jsdelivr.net/gh/scottcook/Righteous@[version]/dist/bundle.js
```

## GSAP Animations

All GSAP animations are centralized in `src/index.js`. When adding new animations:
1. Use the existing timeline management system
2. Follow the established naming conventions
3. Add appropriate console logging
4. Test performance impact

## Troubleshooting

If you encounter issues:
1. Check the console for errors
2. Verify Webflow site ID is correct
3. Ensure GSAP plugins are properly registered
4. Check branch is up to date with staging

## Contact

For questions or issues, please contact the project maintainers or create an issue in the repository. 