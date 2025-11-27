import { useMutation } from '@tanstack/react-query'
import { saveStaminaUpsert, type StaminaPayload } from '@/api/stamina'

export const useSaveStamina = () => {
  return useMutation<void, Error, StaminaPayload>({
    mutationFn: (payload) => saveStaminaUpsert(payload),
  })
}
