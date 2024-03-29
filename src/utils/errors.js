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
    identifier: "OnvsAuthenticationError",
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
    identifier: "OnvsAuthorizationError",
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

export class InexistingResourceError extends OnvsError {
  constructor(message = "The ressource doesn't exist.") {
    super(message)
    this.name = "InexistingResourceError"
    this.statusCode = 404
  }
}

SuperJson.registerClass(InexistingResourceError, {
  identifier: "OnvsInexistingResourceError",
  allowProps: errorProps,
})

export class BadRequestError extends OnvsError {
  constructor(message = "The inputs are not well formed.") {
    super(message)
    this.name = "BadRequestError"
    this.statusCode = 400
  }
}

SuperJson.registerClass(BadRequestError, {
  identifier: "OnvsBadRequestError",
  allowProps: errorProps,
})

import { ZodError } from "zod"

export function composeError(error) {
  let message = error.message || "API error"
  const statusCode = error instanceof ZodError ? 400 : error?.statusCode || 500

  let details

  if (error instanceof ZodError) {
    details = error.format()

    if (details._errors && !details._errors.length) delete details._errors

    const maybePlural = Object.keys(details).length > 1 ? "s" : ""

    message = `Format error on field${maybePlural} : ${Object.keys(
      details,
    ).join(", ")}`
  }

  return { message, statusCode, details }
}
