import { Component } from "react"

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log("error", error)
    console.log("errorInfo", errorInfo)
  }

  render() {
    if (this.props.fallback) {
      return this.props.fallback
    }
    if (this.state.hasError) {
      return <div>出错了</div>
    }
    return this.props.children
  }
}

export const Aaa: React.FC = () => {
  const b = window.a.b
  return (<div>b</div>)
}

export const Bbb: React.FC = () => {
  return (
    <ErrorBoundary>
      <Aaa />
    </ErrorBoundary>
  )
}

