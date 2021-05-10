import withSession from "@/lib/session"

const expectedPassword = "test"

export default withSession(async (req, res) => {
  const { email, password } = await req.body

  try {
    // we check that the user exists on GitHub and store some data in session
    if (password === expectedPassword) {
      const user = { email, isLoggedIn: true }
      req.session.set("user", user)
      await req.session.save()
      return res.json(user)
    }
    throw new Error("Password is incorrect")
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
