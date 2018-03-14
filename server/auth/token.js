import axios from 'axios'
import { signUrl } from '@lumavate/request-signer'

export async function validateToken(token) {
  const signedPath = await signUrl({
    method: 'GET',
    path: `/pwa/v1/token`
  })

  const res = await axios.get(`${process.env.BASE_URL}${signedPath}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })

  return res.data.payload.data
}
