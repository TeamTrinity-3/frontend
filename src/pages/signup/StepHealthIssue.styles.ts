export const s = {
  aside:
    'hidden md:block fixed right-0 top-0 h-svh w-[clamp(0px,calc(100vw-20rem-970px),400px)] bg-[#F5F5F7]',
  main:
    'fixed left-1/2 -translate-x-1/2 max-w-[970px] w-full ' +
    'px-10 max-[490px]:px-[clamp(16px,5vw,40px)] ' +
    'py-0 min-[1100px]:py-15 ' +
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
    'mt-4 min-[1100px]:mt-8 max-w-full w-[400px] md:w-[400px] ' +
    'max-[490px]:w-full max-[490px]:max-w-none mx-auto',

  label: 'mb-4 text-sm max-[490px]:text-xs text-[#468FAF] font-semibold',
  gender: 'px-8 py-1.5 rounded-full text-sm max-[490px]:text-xs transition-colors cursor-pointer',

  submit:
    'px-6 h-10 mb-1 w-full rounded-[5px] bg-[#468FAF] max-[490px]:text-xs text-white hover:bg-[#357893] transition-colors cursor-pointer',
}
