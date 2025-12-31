# Frontend Setup Instructions

## Holiday Calendar Frontend

React + TypeScript application for displaying holiday calendar with country selection and filtering.

## Prerequisites

- Node.js 16+ 
- npm or yarn package manager

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm start
```

This will start the development server at `http://localhost:3000`

### Production Build
```bash
npm build
```

This creates an optimized production build in the `build/` directory.

### Running Tests
```bash
npm test
```

## Project Structure

- `src/components/` - Reusable React components (Calendar, Navigation, Filters)
- `src/pages/` - Page-level components (CalendarPage)
- `src/services/` - API service for communicating with backend
- `src/hooks/` - Custom React hooks for calendar logic and filtering
- `src/styles/` - CSS stylesheets for all components
- `public/` - Static assets and HTML template

## Key Components

### Calendar Component
- Displays a calendar month with holiday indicators
- Shows work holidays with priority (red icon)
- Shows regular holidays with green indicator
- Week-level highlighting for work holidays

### Navigation Component
- Previous/Next month buttons
- Today button to return to current month
- Respects 11-month navigation limits

### Filters Component
- Country dropdown selector
- Holiday type checkboxes (Regular/Work)
- Applies filters to displayed holidays

### CalendarPage
- Main page component that orchestrates the application
- Manages state for calendar, filters, and holiday data
- Fetches data from backend API

## API Integration

The frontend communicates with the backend via REST API:

- Base URL: `http://localhost:8080/api`
- See `src/services/holidayService.ts` for API client implementation

### API Endpoints Used
- `GET /api/countries` - Fetch list of countries
- `GET /api/holidays` - Fetch holidays for a country and date range

## Configuration

Backend API URL is configured in `src/services/holidayService.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Styling

- Responsive CSS Grid layout for 3-month view
- Mobile-friendly design
- Color scheme:
  - Regular holidays: Green (#28a745)
  - Work holidays: Red (#dc3545)
  - Today: Yellow (#fff3cd)
  - Hover effects and smooth transitions

## Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `axios` - HTTP client for API calls
- `date-fns` - Date manipulation utilities
- `typescript` - Type safety

## Browser Support

Modern browsers with ES6+ support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Tips

1. Hot Module Replacement (HMR) is enabled for fast development
2. Use React Developer Tools browser extension for debugging
3. Open `http://localhost:3000` to view the app
4. Console logs and errors appear in browser DevTools

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Dependencies installation fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Backend not accessible
- Ensure backend is running on `http://localhost:8080`
- Check CORS headers in backend response
- Verify API_BASE_URL in holidayService.ts matches backend URL

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm eject` - Eject from create-react-app (irreversible)

## Notes

- The application uses in-memory state management with React hooks
- Data is fetched from backend on component mount and when filters/month change
- Holiday filtering is done on frontend for better UX
- Calendar navigation supports ±11 months from current date
