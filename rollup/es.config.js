import {nodeResolve} from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const configFor = name => ({
  input: `./esm/${name}.js`,
  plugins: [
    nodeResolve(),
    terser()
  ],
  output: {
    esModule: true,
    file: `./dist/${name}.js`,
  }
});

export default [
  configFor('all'),
  configFor('array'),
  configFor('index'),
  configFor('traps'),
  configFor('types'),
];
