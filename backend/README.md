# Toy Robot Simulator Backend

A NestJS application that provides the backend services for the Toy Robot Simulator. The backend handles robot position management, movement validation, and state persistence.

## Features

- RESTful API endpoints for robot control
- Position validation and boundary checking
- State persistence with SQLite
- Swagger API documentation
- TypeORM for database operations
- Domain-driven design architecture

## Project Structure

```
backend/
├── src/
│   ├── domains/           # Domain-driven design modules
│   │   └── locations/     # Location management
│   │       ├── dto.ts     # Data transfer objects
│   │       ├── locations.controller.ts
│   │       ├── locations.service.ts
│   │       └── locations.module.ts
│   ├── entities/          # Database entities
│   │   └── locations.entity.ts
│   ├── main.ts           # Application entry point
│   └── app.module.ts     # Root module
└── test/                 # Test files
```

## Technology Stack

- NestJS
- TypeORM
- SQLite
- TypeScript
- Jest
- Swagger/OpenAPI

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
   cd ../backend
   npm install
   ```

3. **Development**
   ```bash
   npm run start:dev
   ```
   The API will be available at `http://localhost:4800`

4. **Building for Production**
   ```bash
   npm run build
   npm run start:prod
   ```

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test:e2e` - Run end-to-end tests

## API Endpoints

### Locations

- `GET /locations` - Get the last stored location
- `POST /locations` - Create a new location

### Request/Response Format

```typescript
// Location DTO
interface LocationDto {
  row: number;
  column: number;
  orientation: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';
}
```

## Architecture

### Domain Layer
- Contains business logic
- Implements core rules
- Location validation
- Movement calculations

### Application Layer
- Orchestrates domain objects
- Handles use cases
- Manages transactions

### Infrastructure Layer
- Database operations
- External service integration
- Technical implementations

### Presentation Layer
- REST API controllers
- Request validation
- Response formatting

## Database

The application uses SQLite with TypeORM:
- In-memory database for testing
- File-based database for development/production
- Automatic schema synchronization in non-production environments

## Testing

The backend uses Jest for testing:
- Unit tests for services and utilities
- E2E tests for API endpoints
- Test coverage reporting

## API Documentation

Swagger documentation is available at `/api` when running the server. It includes:
- Available endpoints
- Request/Response schemas
- Example requests
- Authentication requirements

## Environment Variables

Create a `.env` file in the root directory with:
```
NODE_ENV=development
PORT=4800
```

## Contributing

1. Follow the domain-driven design architecture
2. Write tests for new features
3. Use TypeScript for type safety
4. Follow the existing code style
5. Update API documentation
6. Add appropriate error handling
