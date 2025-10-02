export const s = {
  root: 'min-h-screen grid place-items-center',
  bgImage: 'absolute inset-0 w-full h-full object-cover -z-10',
  overlay: 'absolute inset-0 bg-black/20 -z-10', // 20% 어두움

  card: 'w-full max-w-md pt-8 pb-8 px-4 rounded-[10px] bg-white',
  title: 'text-2xl font-bold',

  form: 'space-y-3',
  input: 'h-11 rounded-[5px] border border-[#d9d9d9]',

  pwWrap: 'relative',
  pwInput: 'pr-10',
  eyeBtn: 'absolute right-3 top-1/2 -translate-y-1/2 text-[#787878] cursor-pointer',

  forgot: 'block text-right text-sm text-[#468FAF]',
  submit:
    'mt-2 h-11 w-full rounded-[5px] bg-[#468FAF] text-white hover:bg-[#357893] transition-colors cursor-pointer',

  altTitle: 'text-sm mb-3',
  altGrid: 'grid grid-cols-3 gap-4',
  altBtn:
    'flex flex-col items-center justify-center gap-2 p-5 rounded-[10px] bg-[#F8F8F8] text-[#787878] hover:bg-gray-100 transition-colors cursor-pointer',

  helper: 'mt-4 text-sm',
}
