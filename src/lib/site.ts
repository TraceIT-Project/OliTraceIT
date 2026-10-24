export const CONTACT_EMAIL = "traceitagency@gmail.com"

const FORMSPREE_URL = "https://formspree.io/f/xjgedvop"

export async function sendContactForm(data: Record<string, string>) {
  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Formspree respondió ${res.status}`)
}
