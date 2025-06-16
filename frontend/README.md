# Toy Robot Simulator Frontend

A Next.js application that provides the user interface for the Toy Robot Simulator. The frontend allows users to control a robot on a 5x5 grid, with features for movement, rotation, and position tracking.

## Features

- Interactive 5x5 grid interface
- Robot movement controls (Place, Move, Left, Right)
- Visual direction indicators
- Position history tracking
- Keyboard controls support
- Real-time position updates
- Responsive design with Tailwind CSS

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── atoms/          # Basic UI components
│   │   ├── molecules/      # Composite components
│   │   └── organisms/      # Complex components
│   ├── models/             # TypeScript interfaces and types
│   ├── pages/              # Next.js pages
│   ├── services/           # API and data services
│   └── styles/             # Global styles
├── public/                 # Static assets
└── __tests__/             # Test files
```

## Technology Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- Jest & Testing Library

## Getting Started

1. **Prerequisites**
   ```bash
   # Make sure shared package is built first
   cd ../packages/shared
   npm install
   npm run build
   ```

2. **Installation**
   ```bash
   cd ../frontend
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

4. **Building for Production**
   ```bash
   npm run build
   npm run start
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Component Architecture

### Atoms
- Basic UI elements like buttons, inputs, and icons
- Highly reusable and presentational

### Molecules
- Composite components like the Robot and ControlBoard
- Combine atoms to create functional units

### Organisms
- Complex components that form major UI sections
- Handle state management and business logic

## State Management

The application uses React's built-in state management with hooks:
- `useState` for local component state
- Custom hooks for complex state logic
- Context API for global state when needed

## API Integration

The frontend communicates with the backend through the `DataClient` service:
- RESTful API calls
- Type-safe data handling
- Error management
- Response transformation

## Testing

Tests are written using Jest and React Testing Library:
- Unit tests for services and utilities
- Component tests for UI elements
- Integration tests for feature workflows

## Styling

The application uses Tailwind CSS for styling:
- Utility-first approach
- Responsive design
- Custom theme configuration
- Dark mode support

## Environment Variables

Create a `.env.local` file in the root directory with:
```
BACK_END_SERVER_BSE_URL=http://localhost:4800
```
