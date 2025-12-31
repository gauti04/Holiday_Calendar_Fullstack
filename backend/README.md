README.md for Holiday Calendar Backend

## Holiday Calendar Backend

A Spring Boot application that provides REST APIs for managing holiday data using H2 in-memory database.

### Features
- RESTful APIs to fetch holidays for specific countries and date ranges
- Integration with openholidaysapi.org for holiday data
- Caching mechanism to store holidays in H2 database
- CORS support for frontend communication
- Support for filtering holidays by type (REGULAR/WORK)

### Prerequisites
- Java 17+
- Maven 3.6+

### Setup

1. Build the project:
```bash
cd backend
mvn clean install
```

2. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### API Endpoints

#### Get Holidays
```
GET /api/holidays?country=US&startDate=2025-01-01&endDate=2025-12-31&holidayType=WORK
```

Parameters:
- `country` (required): Country code (e.g., US, GB, DE)
- `startDate` (required): Start date in YYYY-MM-DD format
- `endDate` (required): End date in YYYY-MM-DD format
- `holidayType` (optional): REGULAR or WORK

#### Get Countries
```
GET /api/countries
```

#### Debug - Get All Holidays in Database
```
GET /api/holidays/debug
```

### Database
- Uses H2 in-memory database
- Automatically initializes with default countries on startup
- Data persists during the application runtime
- H2 Console available at `http://localhost:8080/h2-console`

### CORS Configuration
- Configured to allow requests from `http://localhost:3000` (React frontend)
- Allows GET, POST, PUT, DELETE, OPTIONS methods
