import { speak } from './tts'

type DetailResponse = {
  category: string
  sequence: number
  content: string
}

type ExercisePayload = {
  exerciseName: string
  equipment: string
  targetArea: string
  primaryMuscle: string
  reps: number
  sets: number
  restSec: number
  detailResponses: DetailResponse[]
}

// TTS 스크립트 만드는 함수
export const buildExerciseScript = (ex: ExercisePayload): string => {
  const warnings = ex.detailResponses
    .filter((d) => d.category === '주의사항')
    .sort((a, b) => a.sequence - b.sequence)
    .map((d) => d.content)

  const descriptions = ex.detailResponses
    .filter((d) => d.category === '설명')
    .sort((a, b) => a.sequence - b.sequence)
    .map((d) => d.content)

  const lines: string[] = []

  lines.push(`다음 운동은 ${ex.exerciseName}입니다.`)
  lines.push('')
  lines.push(
    `주로 ${ex.targetArea}를 사용하는 운동이고, ${ex.primaryMuscle}을 중심으로 사용합니다.`,
  )
  lines.push(`준비물은 ${ex.equipment}입니다.`)
  lines.push('')
  lines.push(`이번 운동은 한 세트에 ${ex.reps}회씩, 총 ${ex.sets}세트 진행합니다.`)
  lines.push(`세트 사이에는 ${ex.restSec}초 동안 휴식합니다.`)
  lines.push('')

  if (warnings.length > 0) {
    lines.push('운동 전 주의사항입니다.')
    warnings.forEach((w) => lines.push(w))
    lines.push('')
  }

  if (descriptions.length > 0) {
    lines.push(`이제 ${ex.exerciseName} 동작 설명입니다.`)
    descriptions.forEach((desc) => lines.push(desc))
    lines.push('')
  }

  lines.push('이제 첫 세트를 시작하겠습니다.')

  return lines.join('\n')
}

// TTS 실행하는 함수
export const playExerciseIntro = (ex: ExercisePayload, onEnd?: () => void) => {
  const script = buildExerciseScript(ex)
  speak(script, onEnd)
}
