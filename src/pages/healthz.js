import React from "react"
import prisma from "@/prisma/db"

const Page = () => <div>It Works!</div>
export default Page

// Probe to detect correct Prisma/DB behavior
export async function getServerSideProps() {
  console.log("Appel de la page healtz :")
  try {
    await prisma.declaration.count()

    console.log(` -> page healtz OK`)
    return { props: {} }
  } catch (error) {
    console.error(` -> page healtz KO`)
    throw error
  }
}
