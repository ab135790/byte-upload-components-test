import alias from '@rollup/plugin-alias'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import { dts } from 'rollup-plugin-dts'
import vue from 'rollup-plugin-vue'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('.', import.meta.url))

const isExternal = (id) =>
  id === 'vue' ||
  id.startsWith('vue/') ||
  id === 'tslib' ||
  id === 'lodash-es' ||
  id.startsWith('lodash-es/')

const javascriptBuild = {
  input: resolve(root, 'src/index.ts'),
  external: isExternal,
  plugins: [
    alias({
      entries: [{ find: /^@\//, replacement: resolve(root, 'src') + '/' }],
    }),
    vue(),
    postcss({ extract: true, minimize: true }),
    typescript({
      tsconfig: resolve(root, 'tsconfig.rollup.json'),
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
          noEmit: false,
        },
      },
    }),
  ],
  output: [
    {
      file: resolve(root, 'lib/rollup/es/index.js'),
      format: 'es',
      sourcemap: true,
    },
    {
      file: resolve(root, 'lib/rollup/cjs/index.cjs'),
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: resolve(root, 'lib/rollup/umd/index.umd.js'),
      format: 'umd',
      name: 'UploadComponent',
      exports: 'named',
      sourcemap: true,
      globals: {
        vue: 'Vue',
        'lodash-es': '_',
        tslib: 'tslib',
      },
    },
  ],
}

const typesBuild = {
  input: resolve(root, 'lib/rollup/types-temp/index.d.ts'),
  output: {
    file: resolve(root, 'lib/rollup/types/index.d.ts'),
    format: 'es',
  },
  plugins: [
    dts({
      tsconfig: resolve(root, 'tsconfig.rollup.json'),
    }),
  ],
}

export default [javascriptBuild, typesBuild]
