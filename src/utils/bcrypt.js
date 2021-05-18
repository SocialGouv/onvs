import { compare, hash } from "bcryptjs"

const saltRounds = 10

// Façade for bcrypt functions
export const hashPassword = async (password) => hash(password, saltRounds)

export const compareWithHash = async (password, hash) => compare(password, hash)
