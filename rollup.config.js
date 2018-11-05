import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'postgrestSyntaxBuilder',
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
