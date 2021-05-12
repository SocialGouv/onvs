export function logDebug(...message) {
  if (
    /on/i.test(process.env.NEXT_PUBLIC_DEBUG_MODE) ||
    /true/i.test(process.env.NEXT_PUBLIC_DEBUG_MODE)
  ) {
    console.debug("logDebug : ", ...message)
  }
}
