// hoc/withAuth.js

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const withAuth = (WrappedComponent) => {
  const ProtectedComponent = (props) => {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user && !loading) {
        router.replace('/')
      }
    }, [user, loading])

    return <WrappedComponent {...props} />
  }

  return ProtectedComponent
}

export default withAuth
