import { ofetch } from 'ofetch'

export const apiFetch = ofetch.create({ baseURL: import.meta.env.VITE_API_URL })
