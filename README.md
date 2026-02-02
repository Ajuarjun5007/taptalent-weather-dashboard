# TapTalent Weather Dashboard

A modern, real-time weather analytics dashboard with Google authentication, city forecasting, and interactive charts.

## Features

- **Real-time Weather Data** - Get current weather conditions for major cities
- **7-Day Forecasts** - View detailed 5-day weather forecasts with hourly data
- **Google Authentication** - Secure login/logout with Firebase
- **Persistent Login** - Session persists across page refreshes
- **City Management** - Pin favorite cities for quick access
- **Interactive Charts** - Temperature, humidity, wind speed, and precipitation trends
- **Temperature Units** - Toggle between Celsius and Fahrenheit
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- **Modern UI** - Glass morphism design with smooth animations and gradients

## Tech Stack

### Frontend Framework
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Redux Toolkit** - State management

### Authentication & Backend
- **Firebase** - Google OAuth authentication
- **OpenWeatherMap API** - Weather data

### UI & Styling
- **React Icons** - Icon library
- **Recharts** - Interactive charts and graphs
- **Custom CSS** - Responsive design with media queries

### Build Tools
- **Create React App** - Project setup
- **Axios** - HTTP client

## Project Structure

```
src/
├── App.js                 # Root component with auth listener
├── App.css                # Global styles
├── index.js               # Entry point
├── firebase.js            # Firebase configuration
├── app/
│   └── store.js           # Redux store setup
├── components/
│   ├── Auth/
│   │   └── GoogleSignIn.jsx
│   ├── Charts/            # Temperature, Wind, Precipitation, Pressure
│   ├── CityCard/          # City card and skeleton components
│   ├── Dashboard/         # Dashboard layout
│   ├── Header/            # Header components
│   ├── Loader/            # Loading spinners
│   ├── SearchBar/         # City search with autocomplete
│   ├── SettingsModal.jsx
│   └── SettingsDropdown.jsx
├── features/              # Redux slices
│   ├── auth/
│   ├── favorites/
│   ├── settings/
│   └── weather/
├── pages/
│   ├── DashboardPage.jsx  # Main dashboard
│   └── CityDetailsPage.jsx # City detail view
└── utils/                 # Helper functions
    ├── constants.js
    ├── helpers.js
    ├── groupForecastByDay.js
    └── winddirection.js
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd taptalent-weather-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase
- Add your Firebase credentials in `src/firebase.js`
- Enable Google authentication in Firebase Console

4. Set up OpenWeatherMap API
- Get API key from [OpenWeatherMap](https://openweathermap.org/api)
- Add it to your environment or API configuration

### Running the App

```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```
Creates optimized production build in the `build/` folder.

## Key Features Breakdown

### Authentication
- Google Sign-In with Firebase
- Sign-out functionality
- Login state persists across page refreshes
- User info display with profile picture

### Weather Display
- Current weather conditions (temperature, humidity, pressure, wind)
- Visual weather icons
- 5-day forecast with hourly data
- City details page with advanced analytics

### Charts & Analytics
- Temperature trends (hourly and daily)
- Humidity patterns
- Wind speed analysis
- Precipitation forecasts
- Atmospheric pressure trends

### City Management
- Search cities with autocomplete
- Pin favorite cities
- Quick access to pinned cities section
- Organized city sections (Indian & International)

### Responsive Design
- Desktop: Full layout with all features
- Tablet: Optimized spacing and font sizes
- Mobile: Single column layout with hamburger menu
- Fixed header for easy navigation

## State Management

Redux stores:
- **weather** - Current weather and forecast data
- **auth** - User authentication state
- **favorites** - Pinned cities list
- **settings** - Temperature unit preference

## Styling

- **Color Scheme**: Teal accent (#2dd4bf), dark gradient background
- **Glass Morphism**: Frosted glass effect on cards
- **Animations**: Smooth transitions and hover effects
- **Responsive Breakpoints**: 
  - Desktop: Default
  - Tablet: max-width 768px
  - Mobile: max-width 480px

## Available Scripts

### Development
```bash
npm start      # Run dev server
npm test       # Run tests
```

### Production
```bash
npm run build  # Create optimized build
npm run eject  # Eject from Create React App (one-way)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Chart data aggregation for better performance
- Lazy loading for city details
- Optimized re-renders with Redux selectors
- Image optimization with weather icons
- CSS animations with hardware acceleration

## Future Enhancements

- Weather alerts and notifications
- User preferences storage
- Extended forecast (14 days)
- Air quality index
- UV index tracking
- Historical weather data
- Weather comparison between cities

## License

This project is part of TapTalent platform.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
