export const isValidDateString = (value?: string) => {
    if (!value) return false
    const d = new Date(value)
    return !Number.isNaN(d.getTime())
}