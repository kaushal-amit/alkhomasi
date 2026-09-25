import { COMPANY } from '../data/site.js'

// Where contact-form submissions go.
//
// Set VITE_FORM_ENDPOINT (in a .env file or your host's build settings) to any
// endpoint that accepts a JSON POST — e.g. Formspree, Web3Forms, Basin, or your
// own API/CRM webhook. Without it, the form falls back to opening the visitor's
// email app with the message pre-filled, so no enquiry is ever silently lost.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export const hasFormEndpoint = Boolean(ENDPOINT)

export async function submitLead(data) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, source: 'alkhomasi-website' }),
    })
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
    return { via: 'endpoint' }
  }

  const subject = `Website enquiry: ${data.requirement} — ${data.name}`
  const body = [
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    `Requirement: ${data.requirement}`,
    '',
    data.message,
  ]
    .filter((line) => line !== undefined && line !== false && line !== '')
    .join('\n')
  window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
