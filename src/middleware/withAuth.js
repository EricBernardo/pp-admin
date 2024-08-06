import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAuth(WrappedComponent) {
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
