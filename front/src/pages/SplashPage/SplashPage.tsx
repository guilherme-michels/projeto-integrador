import { Spinner } from '@chakra-ui/react'

export function SplashPage() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spinner size="xl" color="#783E76" />
    </div>
  )
}
