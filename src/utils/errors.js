import SuperJson from "superjson"

/**
 * Stringify everything in an error, except the stack
 */
export const stringifyError = (error) => {
  // eslint-disable-next-line no-unused-vars
  const [stack, ...keys] = Object.getOwnPropertyNames(error)
  return JSON.stringify(error, keys, " ")
}

export class OnvsError extends Error {
  constructor(message) {
    super(message)
  }
}

const errorProps = ["name", "message", "code", "statusCode", "meta"]
if (process.env.JEST_WORKER_ID === undefined) {
  SuperJson.allowErrorProps(...errorProps)
}

export class AuthenticationError extends Error {
  constructor(message = "You must be logged in to access this") {
    super(message)
    this.name = "AuthenticationError"
    this.statusCode = 401
  }
}
if (process.env.JEST_WORKER_ID === undefined) {
  SuperJson.registerClass(AuthenticationError, {
    identifier: "BlitzAuthenticationError",
    allowProps: errorProps,
  })
}

export class AuthorizationError extends Error {
  constructor(message = "You are not authorized to access this") {
    super(message)
    this.name = "AuthorizationError"
    this.statusCode = 403
  }
}
if (process.env.JEST_WORKER_ID === undefined) {
  SuperJson.registerClass(AuthorizationError, {
    identifier: "BlitzAuthorizationError",
    allowProps: errorProps,
  })
}

export class DuplicateError extends Error {
  constructor(
    message = "The ressource is in conflict with the existing data.",
  ) {
    super(message)
    this.name = "DuplicateError"
    this.statusCode = 409
  }
}

SuperJson.registerClass(DuplicateError, {
  identifier: "OnvsDuplicateError",
  allowProps: errorProps,
})
