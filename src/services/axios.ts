import axios from 'axios'
//https://criscell-site.vercel.app/
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CLIENT_BEARER,
  },
})

