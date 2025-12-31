# Holiday Calendar Application

A full-stack holiday calendar application built with React (frontend) and Spring Boot (backend).

## Project Structure

```
holiday-calendar/
├── frontend/                  # React TypeScript application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   ├── hooks/             # Custom React hooks
│   │   └── styles/            # CSS stylesheets
│   ├── public/                # Static assets
│   └── package.json           # Frontend dependencies
│
└── backend/                   # Spring Boot Java application
    ├── src/
    │   ├── controller/        # REST API controllers
    │   ├── service/           # Business logic
    │   ├── repository/        # Data access layer
    │   ├── model/             # Entity classes
    │   ├── dto/               # Data transfer objects
    │   └── config/            # Configuration classes
    ├── pom.xml                # Maven dependencies
    └── README.md              # Backend setup instructions
```

## Features

### Frontend
- **3-Month Rolling Calendar**: Display previous, current, and next month
- **Month Navigation**: Navigate up to 11 months in past and future
- **Current Day Highlight**: Visual indicator for today
- **Country Selection**: Dropdown to select country
- **Holiday Type Filtering**: Checkboxes to filter regular/work holidays
- **Visual Distinctions**:
  - Regular holidays: Green indicator
  - Work holidays: Red indicator with priority display
  - Weeks with work holidays: Highlighted with left border
  - Single vs. multiple work holidays: Different visual indicators
- **Responsive Design**: Works on desktop and mobile devices

### Backend
- **RESTful APIs**: 
  - `GET /api/holidays` - Fetch holidays for a country and date range
  - `GET /api/countries` - Get list of supported countries
- **Holiday Caching**: H2 in-memory database for storing fetched holidays
- **Integration**: Connects to openholidaysapi.org for holiday data
- **CORS Support**: Configured for frontend communication from localhost:3000
- **Smart Caching**: Checks database before querying external API

## Technology Stack

### Frontend
- React 18 with TypeScript
- Axios for API calls
- date-fns for date manipulation
- CSS3 for styling

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database
- Maven for dependency management
- Lombok for code reduction
- RestTemplate for API calls

## Getting Started

### Prerequisites
- Node.js 16+ (for frontend)
- Java 17+ (for backend)
- Maven 3.6+ (for backend)

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The API server will start at `http://localhost:8080`

## API Documentation

### Get Holidays
**Endpoint**: `GET /api/holidays`

**Parameters**:
- `country` (required): Country code (e.g., US, GB, DE, FR, IN, CA, AU, JP, MX, BR)
- `startDate` (required): Start date in YYYY-MM-DD format
- `endDate` (required): End date in YYYY-MM-DD format
- `holidayType` (optional): REGULAR or WORK

**Example**:
```bash
curl "http://localhost:8080/api/holidays?country=US&startDate=2025-01-01&endDate=2025-12-31"
```

**Response**:
```json
[
  {
    "id": 1,
    "name": "New Year's Day",
    "date": "2025-01-01",
    "type": "REGULAR",
    "countryCode": "US"
  }
]
```

### Get Countries
**Endpoint**: `GET /api/countries`

**Example**:
```bash
curl "http://localhost:8080/api/countries"
```

**Response**:
```json
[
  {
    "code": "US",
    "name": "United States"
  },
  {
    "code": "GB",
    "name": "United Kingdom"
  }
]
```

## Supported Countries

- US - United States
- GB - United Kingdom
- DE - Germany
- FR - France
- IN - India
- CA - Canada
- AU - Australia
- JP - Japan
- MX - Mexico
- BR - Brazil

## Development Notes

### Frontend
- Uses React Hooks for state management
- Custom hooks for calendar navigation and holiday filtering
- Responsive CSS Grid layout
- API calls made through centralized `holidayService`

### Backend
- Single database (H2 in-memory)
- Controllers handle HTTP requests with CORS annotations
- Services contain business logic
- Repositories handle data persistence
- DTOs used for API responses
- RestTemplate used for calling external APIs

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance Considerations

- Holidays are cached in H2 database to minimize external API calls
- 3-month view loads data for 3 months at a time
- Lazy loading of holiday data based on month navigation
- H2 in-memory database provides fast access

## Future Enhancements

- PostgreSQL support for production deployment
- Holiday descriptions and additional metadata
- User preferences storage
- Calendar export (iCal, PDF)
- Holiday reminder notifications
- Mobile app version

## Troubleshooting

### Frontend not connecting to backend
- Ensure backend is running on port 8080
- Check CORS configuration in backend
- Verify API_BASE_URL in `frontend/src/services/holidayService.ts`

### No holidays displayed
- Check network tab in browser console for API errors
- Verify country code is correct
- Check H2 console at `http://localhost:8080/h2-console`

### Backend startup issues
- Ensure Java 17+ is installed
- Check Maven version with `mvn -v`
- Clear Maven cache: `mvn clean`

## License

MIT
