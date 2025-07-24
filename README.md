# TemplateDemoApp

A modern ASP.NET Core 9.0 MVC web application template with Vue.js 3 frontend components, featuring Arabic RTL support and responsive design following DGA (Digital Government Authority) design standards.

## Features

- **ASP.NET Core 9.0 MVC** - Latest .NET framework with Razor views
- **Vue.js 3** - Reactive frontend components with Arabic RTL support
- **Bootstrap 5** - Responsive CSS framework with custom DGA styling
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Arabic RTL Support** - Full right-to-left language support
- **Component-Based Architecture** - Modular Vue.js components
- **Touch & Keyboard Navigation** - Accessibility-focused user interactions

## 📁 Project Structure

```
TemplateDemoApp/
├── Controllers/
│   └── HomeController.cs              # Main controller with data for homepage components
├── Models/
│   └── ErrorViewModel.cs              # Error handling model
├── Views/
│   ├── Home/
│   │   ├── Index.cshtml               # Homepage view with Vue.js integration
│   │   └── Privacy.cshtml             # Privacy page
│   ├── Shared/
│   │   ├── _Layout.cshtml             # Main layout template
│   │   ├── _Layout.cshtml.css         # Layout-specific styles
│   │   ├── _ViewImports.cshtml        # Global view imports
│   │   ├── _ViewStart.cshtml          # View startup configuration
│   │   ├── Error.cshtml               # Error page template
│   │   └── Partials/                  # Reusable partial views
│   │       ├── _AccessibilityToolbarPartial.cshtml
│   │       ├── _FooterPartial.cshtml
│   │       ├── _HeaderPartial.cshtml
│   │       ├── _LoginPartial.cshtml
│   │       └── _ValidationScriptsPartial.cshtml
├── wwwroot/                           # Static web assets
│   ├── css/                           # Stylesheets
│   │   ├── site.css                   # Global site styles
│   │   ├── home.css                   # Homepage-specific styles
│   │   ├── Layout.css                 # Layout component styles
│   │   └── components/
│   │       └── _buttons.css           # Button component styles
│   ├── js/                            # JavaScript files
│   │   ├── site.js                    # Global site scripts
│   │   ├── home.js                    # Homepage Vue.js app initialization
│   │   └── components/                # Vue.js components
│   │       └── Home/
│   │           ├── FeaturesSlider.js  # Features carousel component
│   │           ├── HeroCarousel.js    # Hero banner carousel
│   │           ├── NewsSection.js     # News articles component
│   │           ├── SectorsGrid.js     # Sectors/departments grid with pagination
│   │           └── StatsSection.js    # Statistics display component
│   ├── lib/                           # Third-party libraries
│   │   ├── bootstrap/                 # Bootstrap CSS framework
│   │   ├── jquery/                    # jQuery library
│   │   ├── jquery-validation/         # Form validation
│   │   └── jquery-validation-unobtrusive/
│   └── favicon.ico                    # Site favicon
├── Properties/
│   └── launchSettings.json            # Development server settings
├── appsettings.json                   # Application configuration
├── appsettings.Development.json       # Development-specific settings
├── Program.cs                         # Application entry point and configuration
├── TemplateDemoApp.csproj            # Project file with dependencies
└── .gitignore                        # Git ignore rules
```

##  Frontend Components

### Vue.js Components (wwwroot/js/components/Home/)

1. **HeroCarousel.js**
   - Main banner carousel with navigation
   - Touch gesture support for mobile
   - Automatic slideshow functionality

2. **SectorsGrid.js**
   - Responsive grid displaying organization departments
   - Pagination with navigation indicators
   - Adaptive items per page based on screen size
   - Touch/swipe navigation support

3. **FeaturesSlider.js**
   - Featured services carousel
   - Smooth transitions and navigation
   - Mobile-optimized touch controls

4. **StatsSection.js**
   - Animated statistics counter
   - Intersection Observer for scroll-triggered animations
   - Responsive layout

5. **NewsSection.js**
   - News articles display
   - Card-based layout
   - Responsive grid system

##  Technology Stack

- **Backend**: ASP.NET Core 9.0 MVC
- **Frontend**: Vue.js 3, Bootstrap 5
- **Styling**: CSS3, Bootstrap RTL
- **Icons**: Bootstrap Icons
- **Fonts**: System fonts with Arabic support
- **Build Tools**: .NET SDK, MSBuild

##  Getting Started

### Prerequisites

- .NET 9.0 SDK or later
- Visual Studio 2022 or VS Code
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raghad-Alahmadi/TemplateDemoApp
   cd TemplateDemoApp
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the application**
   ```bash
   dotnet run
   ```

4. **Open in browser**
   Navigate to `https://localhost:5001` or `http://localhost:5000`

### Development Server

The application runs on:
- **HTTPS**: `https://localhost:5001`
- **HTTP**: `http://localhost:5000`

Hot reload is enabled for development, so changes to CSS/JS files will be reflected immediately.

##  Key Features Explained

### Responsive Design
- **Desktop (≥1200px)**: 4 items per row in grids
- **Large Tablet (992-1199px)**: 3 items per row
- **Tablet (768-991px)**: 2 items per row
- **Mobile (<768px)**: 1 item per row

### Arabic RTL Support
- Full right-to-left layout support
- Arabic text rendering
- RTL-aware navigation and animations
- Proper text alignment and spacing

### Vue.js Integration
- Server-side data passed to Vue components via `window.serverData`
- Reactive components with props and computed properties
- Component lifecycle management
- Event handling for touch and keyboard interactions

### Navigation System
- Touch gesture support (swipe left/right)
- Keyboard navigation (arrow keys, Home/End)
- Pagination indicators
- Responsive navigation controls

## 🔧 Configuration

### Application Settings (appsettings.json)
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Session Configuration (Program.cs)
- Session timeout: 30 minutes
- HTTP-only cookies for security
- Essential cookies for GDPR compliance

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES6+, CSS Grid, Flexbox, Intersection Observer

##  Styling Guidelines

### CSS Architecture
- **Global styles**: `site.css`
- **Component styles**: Individual CSS files in `components/`
- **Layout styles**: `Layout.css`
- **Page-specific**: `home.css`

### Color Scheme (DGA Standards)
- **Primary**: `#1b8254` (Green)
- **Background**: `#f2fcf6` (Light green)
- **Text**: `#1F2A37` (Dark gray)
- **Border**: `#D2D6DB` (Light gray)

### Typography
- **Headings**: System fonts with fallbacks
- **Body**: 16px base font size
- **Arabic**: Proper Arabic font stack

##  Security Features

- HTTPS redirection in production
- Session management with secure cookies
- CSRF protection via ASP.NET Core
- Content Security Policy headers
- XSS protection


##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the code comments for implementation details



---

**Built using ASP.NET Core and Vue.js**
