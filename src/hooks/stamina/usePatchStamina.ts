import { useMutation } from '@tanstack/react-query'
import { patchStamina, type StaminaPayload } from '@/api/stamina'

export const usePatchStamina = () => {
  return useMutation<void, Error, StaminaPayload>({
    mutationFn: (payload) => patchStamina(payload),
  })
}
