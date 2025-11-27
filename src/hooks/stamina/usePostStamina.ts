import { useMutation } from '@tanstack/react-query'
import { postStamina, type StaminaPayload } from '@/api/stamina'

export const usePostStamina = () => {
  return useMutation<void, Error, StaminaPayload>({
    mutationFn: (payload) => postStamina(payload),
  })
}
