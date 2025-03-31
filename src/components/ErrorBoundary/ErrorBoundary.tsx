import { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button } from '@mui/material';
import { useFileStore } from '@/store/fileStore';

interface Props {
  children: ReactNode;
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
        <Alert
          severity="error"
          action={
            <Button color="inherit" onClick={this.handleReset}>
              Попробуй ещё
            </Button>
          }
        >
          Что-то пошло не так: {this.state.error?.message}
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
