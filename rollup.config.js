import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';

const rollupCompiler = {
    /** 入口文件 */
    input: './src/index.ts',
    /** 出口文件 */
    output: {
        file: './dist/index.js',
        format: 'cjs', // 输出模式
    },
    plugins: [resolve(), commonjs(), eslint({ fix: true }), typescript()],
};

module.exports = rollupCompiler;
