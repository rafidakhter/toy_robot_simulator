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

## Future Test Cases

### LocationService Tests

1. **getLastLocation**
   - Should fetch and transform location data correctly
   - Should handle undefined response from API
   - Should handle API errors gracefully
   - Should transform DTO to Location model correctly
   - Should handle network errors with appropriate error message

2. **updateLocation**
   - Should send location data in correct format
   - Should transform Location model to DTO correctly
   - Should handle API errors with appropriate error message
   - Should handle network errors gracefully
   - Should validate location data before sending

### DataClient Tests

1. **GET Requests**
   - Should make GET request with correct URL
   - Should handle successful responses
   - Should handle 404 responses
   - Should handle 500 server errors
   - Should handle network errors
   - Should handle malformed JSON responses
   - Should handle empty responses

2. **POST Requests**
   - Should make POST request with correct headers
   - Should stringify request body correctly
   - Should handle successful responses
   - Should handle validation errors (400)
   - Should handle server errors (500)
   - Should handle network errors
   - Should handle malformed request data

3. **Error Handling**
   - Should provide user-friendly error messages
   - Should log errors to console
   - Should handle timeout scenarios
   - Should handle CORS errors
   - Should handle rate limiting

4. **Response Processing**
   - Should parse JSON responses correctly
   - Should handle empty responses
   - Should handle different content types
   - Should validate response data structure

5. **Integration Tests**
   - Should work correctly with LocationService
   - Should handle concurrent requests
   - Should maintain consistent state
   - Should handle API endpoint changes gracefully
