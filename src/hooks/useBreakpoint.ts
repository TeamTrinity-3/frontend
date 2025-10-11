import { useEffect, useState } from 'react'

/** 전달한 미디어쿼리가 매치되는지 여부만 반환 */
export function useBreakpoint(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)

    update() // 초기 동기화

    // 현대 브라우저
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', update)
      return () => mql.removeEventListener('change', update)
    }

    // 레거시 폴백
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [query])

  return matches
}
