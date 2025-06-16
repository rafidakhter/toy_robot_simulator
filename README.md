# Toy Robot Simulator

A full-stack application that simulates a toy robot moving on a 5x5 table. The project follows a monorepo structure with separate frontend and backend services.

## Project Description

This application simulates a toy robot moving on a 5x5 square tabletop with the following features:

- Interactive 5x5 grid interface
- Robot movement controls (Place, Move, Left, Right)
- Position tracking and history
- Keyboard controls (arrow keys)
- State persistence
- Real-time position updates

### Key Features

1. **Robot Placement**
   - Click on table space to PLACE robot
   - Origin (0,0) at SOUTH WEST corner (bottom left)
   - First command must be PLACE
   - Subsequent PLACE commands allowed
   - Invalid placements ignored

2. **Robot Movement**
   - MOVE: One space forward in facing direction
   - LEFT/RIGHT: 90-degree rotation
   - Prevents falling off table
   - Ignores invalid moves

3. **Position Tracking**
   - Saves position in database
   - Restores position on page refresh
   - Maintains movement history
   - Updates database on position changes

4. **User Interface**
   - Button controls
   - Arrow key support
   - Visual direction indicators
   - Position reporting
   - Resting Position

## Project Structure

```
toy-robot-simulator/
├── backend/                 # NestJS Backend Service
│   ├── src/
│   │   ├── domains/        # Domain-driven design modules
│   │   │   ├── locations/  # Location management
│   │   ├── entities/       # Database entities
│   │   ├── shared/         # Shared utilities and types
│   │   └── main.ts         # Application entry point
│   └── test/               # Backend tests
├── frontend/               # Next.js Frontend Application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── models/         # TypeScript models
│   │   ├── pages/          # Next.js pages
│   │   └── styles/         # CSS styles
│   └── public/            # Static assets
└── packages/              # Shared packages
    └── shared/           # Shared types and utilities
```

## Architecture

### Backend (NestJS)

The backend follows a Domain-Driven Design (DDD) approach with the following layers:

1. **Domain Layer**
   - Contains business logic and domain models
   - Implements core business rules
   - Located in `src/domains/`

2. **Application Layer**
   - Orchestrates domain objects
   - Handles use cases
   - Manages transactions

3. **Infrastructure Layer**
   - Implements technical capabilities
   - Database access
   - External service integration

4. **Presentation Layer**
   - REST API controllers
   - Request/Response handling
   - Input validation

### Frontend (Next.js)

The frontend follows a component-based architecture:

1. **Pages**
   - Next.js pages for routing
   - Server-side rendering support

2. **Components**
   - Reusable UI components
   - State management
   - Event handling

3. **Models**
   - TypeScript interfaces
   - Data validation
   - API integration

## Technology Stack

### Backend
- NestJS
- TypeORM
- SQLite
- TypeScript
- Jest for testing

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Jest for testing

## Getting Started

1. **Prerequisites**
   ```bash
   # First, build the shared package
   cd packages/shared
   npm install
   npm run build
   ```

2. **Installation**
   ```bash
   # Install root dependencies
   cd ../..
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Development**
   ```bash
   # Start backend (in one terminal)
   cd backend
   npm run start:dev

   # Start frontend (in another terminal)
   cd frontend
   npm run dev
   ```

3. **Testing**
   ```bash
   # Backend tests
   cd backend
   npm run test        # Run unit tests
   npm run test:e2e    # Run end-to-end tests
   ```

### Edge Cases

1. **Invalid Placement**
   - Click outside table
   - Expected: No action

2. **Invalid Movement**
   - Move towards table edge
   - Expected: Position unchanged

3. **Multiple Placements**
   - Place robot multiple times
   - Expected: Previous robot removed

4. **State Persistence**
   - Refresh page
   - Expected: Robot position restored

### Keyboard Controls

1. **Arrow Keys**
   - Use arrow keys to move
   - Expected: Robot moves in arrow direction

2. **Button Controls**
   - Use on-screen buttons
   - Expected: Robot responds to commands

## API Documentation

The API documentation is available at `/api` when running the backend service. It includes:

- Available endpoints
- Request/Response schemas
- Authentication requirements
- Example requests

## Design Decisions

1. **Component Architecture**
   - Atomic design pattern
   - Reusable components
   - Clear separation of concerns

2. **State Management**
   - React hooks for local state
   - Custom hooks for complex logic
   - Database persistence

3. **Error Handling**
   - Graceful error recovery
   - User-friendly messages
   - Comprehensive logging

## Future Improvements

1. **Testing**
   - Additional unit tests
   - Integration tests
   - E2E tests

2. **Performance**
   - Request caching
   - Optimistic updates
   - Performance monitoring


   Refer to the README.md fils in ./frontend and ./backend for more information