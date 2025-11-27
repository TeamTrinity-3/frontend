import type { HealthInfo } from '@/api/health'

export type DashboardUser = {
  age: number
  bmi: number
  gender: 'M' | 'F'
}

// 생년월일 >> 나이
const calcAgeFromBirth = (birth?: string | null) => {
  if (!birth || birth.length !== 8) return null

  const year = Number(birth.slice(0, 4))
  const month = Number(birth.slice(4, 6)) - 1
  const day = Number(birth.slice(6, 8))

  const today = new Date()
  let age = today.getFullYear() - year

  const isBirthdayPassed =
    today.getMonth() > month || (today.getMonth() === month && today.getDate() >= day)

  if (!isBirthdayPassed) age -= 1
  return age
}

// 키/몸무게 >> bmi
const calcBmi = (heightCm?: number | null, weightKg?: number | null) => {
  if (!heightCm || !weightKg) return null
  const h = heightCm / 100
  return Number((weightKg / (h * h)).toFixed(1))
}

// HealthInfo >> DashboardUser
export const buildDashboardUser = (healthInfo: HealthInfo | null): DashboardUser | null => {
  if (!healthInfo) return null

  const age = calcAgeFromBirth(healthInfo.birth)
  const bmi = calcBmi(healthInfo.height, healthInfo.weight)
  const gender: 'M' | 'F' = healthInfo.gender === '여자' ? 'F' : 'M'

  if (age == null || bmi == null) return null
  return { age, bmi, gender }
}
