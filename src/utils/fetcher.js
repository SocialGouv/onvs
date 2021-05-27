/**
 * Fetch API function which throws an error in case of status code outside the range 2xx.
 */
const fetcher = async (endpoint, options) => {
  const response = await fetch(endpoint, options)

  if (!response.ok) {
    const { message } = await response.json()

    throw new Error(message || "Erreur serveur")
  }

  return response.json()
}

export default fetcher
