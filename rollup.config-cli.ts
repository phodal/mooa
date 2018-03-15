import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const libraryName = 'cli';

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {file: pkg.bin, format: 'es'},
  ],
  sourcemap: true,
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript({useTsconfigDeclarationDir: true}),
    resolve({
      browser: true
    }),
    sourceMaps(),
  ],
};
