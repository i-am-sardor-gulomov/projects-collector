import { useQuasar } from 'quasar'

function useNotify() {
  const q = useQuasar()
  const success = (message: string) => {
    q.notify({
      message,
      color: 'positive',
      icon: 'check_circle',
    })
  }
  const error = (message: string) => {
    q.notify({
      message,
      color: 'negative',
      icon: 'report_problem',
    })
  }
  const warning = (message: string) => {
    q.notify({
      message,
      color: 'orange',
      icon: 'info',
    })
  }
  return {
    success,
    error,
    warning,
  }
}

export default useNotify
