import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button } from '@mui/material';
import { useFileStore } from '@/store/fileStore';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    const { resetError } = useFileStore.getState();
    resetError();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Alert severity="error" action={<Button onClick={this.handleReset}>Try Again</Button>}>
            {this.state.error?.message}
          </Alert>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
