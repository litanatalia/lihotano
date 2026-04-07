import { Hono } from 'hono'

type Env = {
  SUPABASE_URL: string
  SUPABASE_KEY: string
}

export const signupEmailVerificationRoute = new Hono<{ Bindings: Env }>()

signupEmailVerificationRoute.get('/auth/callback', (c) => {
  return c.html(`
    <html>
      <body>
        <h1>Memproses login...</h1>

        <script>
          const hash = window.location.hash.substring(1)
          const params = new URLSearchParams(hash)

          const access_token = params.get("access_token")
          const refresh_token = params.get("refresh_token")

          if (access_token && refresh_token) {
            // Simpan ke localStorage
            localStorage.setItem("access_token", access_token)
            localStorage.setItem("refresh_token", refresh_token)

            document.body.innerHTML = "<h1>Login berhasil 🎉</h1>"

            // redirect ke dashboard (optional)
            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 1500)
          } else {
            document.body.innerHTML = "<h1>Login gagal ❌</h1>"
          }
        </script>
      </body>
    </html>
  `)
})