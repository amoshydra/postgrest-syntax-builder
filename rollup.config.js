import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const preferredDefaultOutputFormat = {
  format: 'umd',
  name: 'postgrestSyntaxBuilder',
};

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.umd.js',
      ...preferredDefaultOutputFormat,
    },
    {
      file: 'dist/index.js',
      ...preferredDefaultOutputFormat,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      include: 'src/**',
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
      ],
    }),
    minify({
      comments: false,
      sourceMap: true,
    }),
  ],
};
