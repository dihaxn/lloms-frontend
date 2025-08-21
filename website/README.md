# Little Lanka Website

A modern, responsive React-based website for Little Lanka, featuring a beautiful UI with animations, efficient data fetching, and modern development practices.

## 🚀 Features

- **Modern React 19** with latest hooks and patterns
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** using Framer Motion
- **Efficient Data Fetching** with React Query
- **Error Handling** with Error Boundaries
- **Notification System** for user feedback
- **Lazy Loading** for optimal performance
- **Comprehensive Testing** with Vitest
- **Modern Build Tool** with Vite

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7
- **Styling**: Tailwind CSS 4
- **State Management**: React Query, Context API
- **Animations**: Framer Motion
- **Build Tool**: Vite 6
- **Testing**: Vitest, React Testing Library
- **HTTP Client**: Axios

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── styles/             # Global styles and CSS
├── websiteComponents/  # Website-specific components
├── AppWebsite.jsx      # Main app component
└── main.jsx           # App entry point
```

## 🎨 Key Components

- **ErrorBoundary** - Catches and handles JavaScript errors
- **NotificationSystem** - Global notification management
- **LoadingSpinner** - Loading states and animations
- **PageTransition** - Smooth page transitions
- **ProductCard** - Product display component
- **Navbar** - Navigation component

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Mock Data System
The project includes a comprehensive mock data system that automatically activates when the backend is not available:

- **Automatic Fallback**: When the backend is unreachable, the app automatically switches to mock data
- **Realistic Data**: Includes 8 sample products, 4 outlets, categories, and reviews
- **No Code Changes**: Your components work seamlessly with both mock and real data
- **Easy Testing**: Perfect for frontend development and testing without backend setup

#### Demo Page
Visit `/demo` to see the mock data in action and test all functionality.

### Tailwind CSS
The project uses Tailwind CSS 4 with custom configuration in `tailwind.config.js`.

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and hook testing
- **Integration Tests**: Component interaction testing
- **Test Coverage**: Coverage reporting with Vitest

Run tests:
```bash
npm run test
npm run test:coverage
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Deploy to Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Deploy: `netlify deploy --prod --dir=dist`

## 📱 Performance Features

- **Code Splitting** with React.lazy()
- **Lazy Loading** for images and components
- **Optimized Bundles** with Vite
- **Efficient Caching** with React Query
- **Minimal Bundle Size** with tree shaking

## 🔒 Security Features

- **XSS Prevention** with proper sanitization
- **Input Validation** for forms
- **Secure Storage** for sensitive data
- **Error Boundaries** for graceful error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is private and proprietary to Little Lanka.

## 🆘 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using modern web technologies**
