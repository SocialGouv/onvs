import withSession from "@/lib/session"
import { findWithCredentials } from "@/services/users"

export default withSession(async (req, res) => {
  const { email, password } = await req.body

  try {
    const user = {
      ...(await findWithCredentials({ email, password })),
      isLoggedIn: true,
    }

    req.session.set("user", user)
    await req.session.save()
    return res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Password is incorrect" })
  }
})
