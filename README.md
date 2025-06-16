# Toy Robot Simulator

A full-stack application that simulates a toy robot moving on a 5x5 table. The project follows a monorepo structure with separate frontend and backend services.

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

## Key Features

1. **Robot Movement**
   - Place, Move, Left, Right commands
   - Boundary checking
   - Direction management

2. **Location Tracking**
   - Position history
   - State persistence
   - Real-time updates

3. **User Interface**
   - Interactive grid
   - Command input
   - Visual feedback

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

## Getting Started

1. **Installation**
   ```bash
   # First, build the shared package
   cd packages/shared
   npm install
   npm run build

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

2. **Development**
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

4. **Linting and Formatting**
   ```bash
   # Backend
   cd backend
   npm run lint        # Run ESLint
   npm run format      # Format code with Prettier

   # Frontend
   cd frontend
   npm run lint        # Run ESLint
   npm run format      # Format code with Prettier
   ```

## API Documentation

The API documentation is available at `/api` when running the backend service. It includes:

- Available endpoints
- Request/Response schemas
- Authentication requirements
- Example requests