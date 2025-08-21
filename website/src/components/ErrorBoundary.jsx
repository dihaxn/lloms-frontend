import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // In production, you might want to send this to an error reporting service
    if (import.meta.env.PROD) {
      // Example: sendToErrorReportingService(error, errorInfo, errorId);
      console.error('Production error:', { error, errorInfo, errorId });
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  handleReportError = () => {
    const { error, errorInfo, errorId } = this.state;
    
    // Create error report
    const errorReport = {
      errorId,
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // In a real app, you'd send this to your error reporting service
    console.log('Error report:', errorReport);
    
    // For now, just show an alert
    alert(`Error reported with ID: ${errorId}\n\nPlease contact support with this ID.`);
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
        >
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            {/* Error Icon */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-6xl mb-6"
            >
              🚨
            </motion.div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. Our team has been notified.
            </p>

            {/* Error ID for support */}
            {this.state.errorId && (
              <div className="bg-gray-100 rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-500 mb-1">Error ID:</p>
                <p className="font-mono text-sm text-gray-700 break-all">
                  {this.state.errorId}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-[#F4952C] text-white py-3 px-6 rounded-lg hover:bg-[#e08520] transition-colors duration-200 font-semibold"
              >
                Try Again
              </button>
              
              <button
                onClick={this.handleReportError}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-semibold"
              >
                Report Error
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-transparent text-[#F4952C] py-3 px-6 rounded-lg hover:bg-[#F4952C] hover:text-white transition-all duration-200 font-semibold border-2 border-[#F4952C]"
              >
                Go Home
              </button>
            </div>

            {/* Development Error Details */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm">
                  <p className="text-red-800 font-semibold mb-2">
                    {this.state.error.toString()}
                  </p>
                  <pre className="text-red-700 text-xs overflow-auto">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
