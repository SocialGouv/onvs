/**
 * Fetch API function which throws an error in case of status code outside the range 2xx.
 */
const fetcher = async (endpoint, options) => {
  const response = await fetch(endpoint, options)

  if (!response.ok) {
    const error = new Error("Fetcher error")
    error.info = await response.json()
    error.status = response.status
    throw error
  }

  return response.json()
}

export default fetcher
