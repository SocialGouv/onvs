import React from "react"
import prisma from "@/prisma/db"

const Page = () => <div>It Works!</div>
export default Page

// Probe to detect correct Prisma/DB behavior
export async function getServerSideProps() {
  try {
    await prisma.declaration.count()

    console.log(` -> healtz : connexion Postgres via Prisma OK`)
    return { props: {} }
  } catch (error) {
    console.error(` -> healtz : connexion Postgres via Prisma KO`)
    throw error
  }
}
