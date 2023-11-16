export default function useFormRules() {
  return {
    required: (message = '') => (val: any) => {
      return !!val || (message || 'This field is required!')
    },
    min: (length: number, message = '') => (val: any) => {
      return val.length >= length || (message || `This field must be at least ${length} characters!`)
    },
  }
}
