
'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Check if it's a webpack/module loading error
    const isWebpackError = error.message?.includes('Cannot read properties of undefined') ||
                          error.stack?.includes('webpack') ||
                          error.stack?.includes('__webpack_require__')
    
    if (isWebpackError) {
      console.warn('Webpack module loading error detected, attempting recovery...')
      // For webpack errors, we can try to recover by reloading
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }, 2000)
    }
    
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log non-webpack errors to avoid spam
    if (!error.stack?.includes('webpack')) {
      console.error('Error Boundary - Full error details:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      })
    }
    
    this.setState({ errorInfo })
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      const isWebpackError = this.state.error?.stack?.includes('webpack') ||
                            this.state.error?.message?.includes('Cannot read properties of undefined')

      if (isWebpackError) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-brown-50">
            <div className="text-center p-8 max-w-md">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-800 mx-auto mb-4"></div>
              <h2 className="text-xl font-light text-brown-800 mb-4">
                Loading Application...
              </h2>
              <p className="text-brown-600 mb-6 text-sm">
                The application is initializing. This page will refresh automatically.
              </p>
              <button
                onClick={this.handleReload}
                className="bg-brown-800 text-cream px-6 py-2 rounded hover:bg-brown-700 transition-colors"
              >
                Refresh Now
              </button>
            </div>
          </div>
        )
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-brown-50">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-2xl font-light text-brown-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-brown-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="space-x-4">
              <button
                onClick={this.handleRetry}
                className="bg-brown-800 text-cream px-6 py-2 rounded hover:bg-brown-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
