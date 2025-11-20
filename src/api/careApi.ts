// care axios 인스턴스 세팅
import axios from 'axios'

export const careApi = axios.create({
  baseURL: import.meta.env.VITE_API_CARE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// token이 있으면 Authorization 헤더에 token을 넣어줌
careApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 토큰 만료되거나 유효하지 않으면 로그인으로 보내버리기
careApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401 || status === 403) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.')
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)
