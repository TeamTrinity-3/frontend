export const s = {
  aside:
    'hidden md:block fixed right-0 top-0 h-svh w-[clamp(0px,calc(100vw-20rem-970px),400px)] bg-[#F5F5F7]',
  main:
    'fixed left-1/2 -translate-x-1/2 max-w-[970px] w-full ' +
    'px-10 max-[490px]:px-[clamp(16px,5vw,40px)] ' +
    'py-0 min-[1100px]:py-40 ' +
    'min-[1291px]:left-80 min-[1291px]:translate-x-0 min-[1291px]:px-0',
  grid:
    'grid grid-cols-1 min-[1100px]:grid-cols-[400px_400px] ' +
    'gap-5 min-[1100px]:gap-22 place-items-center ' +
    'max-[490px]:justify-items-stretch',

  // heading
  caption: 'mb-2 max-[490px]:text-xs text-[#787878]',
  title: 'max-[490px]:text-lg text-2xl font-bold',

  // form section
  section: 'w-[400px] max-[490px]:w-full max-[490px]:max-w-none mx-auto space-y-5',

  // step image
  stepImg:
    'mt-4 min-[1100px]:mt-8 max-w-full w-[400px] md:w-[400px] md:ml-1 ' +
    'max-[490px]:w-full max-[490px]:max-w-none mx-auto',

  label: 'mb-2 text-sm max-[490px]:text-xs text-[#468FAF] font-semibold',
  input: 'max-[490px]:text-xs h-11 rounded-[5px] border border-[#d9d9d9]',

  btn: 'block ml-auto mt-2 mb-2 h-8.5 rounded-[5px] bg-[#468FAF] text-xs text-white hover:bg-[#357893] transition-colors cursor-pointer',
  submit:
    'px-6 h-10 mb-1 w-full rounded-[5px] bg-[#468FAF] max-[490px]:text-xs text-white hover:bg-[#357893] transition-colors cursor-pointer',
}
