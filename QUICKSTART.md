# Quick Start Guide

## Running Both Services

Follow these steps to run the Holiday Calendar application locally:

### 1. Terminal 1 - Start Backend

```bash
cd backend
mvn spring-boot:run
```

Expected output:
```
[main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080
```

Backend is now running at: **http://localhost:8080**

### 2. Terminal 2 - Start Frontend

```bash
cd frontend
npm install  # First time only
npm start
```

Expected output:
```
Compiled successfully!
You can now view holiday-calendar-frontend in the browser.
  Local:            http://localhost:3000
```

Frontend is now running at: **http://localhost:3000**

### 3. Access the Application

Open your browser and navigate to: **http://localhost:3000**

## First Time Setup

### Prerequisites Check
- ✅ Java 17+ installed: `java -version`
- ✅ Maven installed: `mvn -version`
- ✅ Node.js 16+ installed: `node -v`
- ✅ npm installed: `npm -v`

### Initial Setup Steps

**For Backend (One-time)**
```bash
cd backend
mvn clean install
```

**For Frontend (One-time)**
```bash
cd frontend
npm install
```

## Using the Application

1. **Select a Country**: Use the dropdown to select a country (US, GB, DE, FR, IN, CA, AU, JP, MX, BR)
2. **Filter Holiday Types**: Check/uncheck boxes to show Regular holidays, Work holidays, or both
3. **Navigate Months**: Use Previous/Next buttons to move through months
4. **Go to Today**: Click "Today" to return to current month

### Understanding the Display

- **Yellow highlight**: Today's date
- **Green dot (●)**: Regular holiday
- **Red icon (✓ or ⚠️)**: Work holiday
  - ✓ = Single work holiday
  - ⚠️ = Multiple work holidays on same day
- **Highlighted weeks**: Weeks containing work holidays
  - Light red background = Week with 1 work holiday
  - Darker red background = Week with multiple work holidays

## Ports Used

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **H2 Console** (debugging): http://localhost:8080/h2-console

## Stopping Services

- Press `Ctrl+C` in each terminal to stop the services

## Common Issues & Solutions

### "Port 3000 already in use"
Kill process on port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### "Cannot connect to backend"
- Verify backend is running on port 8080
- Check that CORS is enabled in backend
- Clear browser cache (Ctrl+Shift+Delete)

### "No holidays displayed"
- Check browser console for errors (F12)
- Try selecting a different country
- Check backend logs for API errors

### "mvn command not found"
- Install Maven: https://maven.apache.org/install.html
- Ensure MAVEN_HOME is in PATH

### "npm install fails"
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## API Testing (Optional)

Test the backend API directly:

```bash
# Get countries
curl http://localhost:8080/api/countries

# Get holidays for USA in 2025
curl "http://localhost:8080/api/holidays?country=US&startDate=2025-01-01&endDate=2025-12-31"

# Get only work holidays
curl "http://localhost:8080/api/holidays?country=US&startDate=2025-01-01&endDate=2025-12-31&holidayType=WORK"
```

## Database Console (Optional)

Access H2 database console:
1. Navigate to: http://localhost:8080/h2-console
2. Click "Connect"
3. Query tables: `SELECT * FROM HOLIDAYS;`

## Next Steps

- Modify supported countries in `backend/src/main/java/com/holidaycalendar/service/CountryService.java`
- Customize colors in `frontend/src/styles/Calendar.css`
- Add more countries by updating the initialization method

## Development Tips

- Frontend hot-reloads on file changes (no restart needed)
- Backend requires restart for Java file changes
- Check browser console (F12) for frontend errors
- Check backend logs (terminal) for API errors

## Project Structure

```
holiday-calendar/
├── README.md                    # Main documentation
├── QUICKSTART.md               # This file
│
├── frontend/                   # React app
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── index.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── styles/
│   └── public/
│
└── backend/                    # Spring Boot app
    ├── pom.xml
    ├── src/
    │   └── main/
    │       ├── java/com/holidaycalendar/
    │       │   ├── HolidayCalendarApplication.java
    │       │   ├── controller/
    │       │   ├── service/
    │       │   ├── repository/
    │       │   ├── model/
    │       │   ├── dto/
    │       │   └── config/
    │       └── resources/
    │           └── application.properties
    └── README.md
```

Enjoy your Holiday Calendar Application! 🎉
