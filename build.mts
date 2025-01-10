import * as esbuild from 'esbuild'

// Build both ESM and CJS versions
Promise.all([
  // ESM build
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.js',
    format: 'esm',
    platform: 'node',
    target: ['node14'],
    bundle: true,
    external: ['tailwindcss'],
    sourcemap: true,
  }),

  // CommonJS build
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    outfile: './dist/index.cjs',
    format: 'cjs',
    platform: 'node',
    target: ['node14'],
    bundle: true,
    external: ['tailwindcss'],
    sourcemap: true,
  }),
])
.then(() => {
  console.log('⚡ Build complete! ESM and CommonJS outputs generated.')
})
.catch((error) => {
  console.error('⚠️ Build failed:', error)
  process.exit(1)
})
