import esbuild from 'esbuild';

const buildSequence = [
  {
    in: './render/render.js',
    out: './build/re4ma.js',
  },
  {
    in: './ext_modules/marked',
    out: './build/mkd.esm.min.js',
  },
];

function build(buildItem) {
  esbuild.build({
    entryPoints: [buildItem.in],
    format: 'esm',
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: buildItem.out,
    target: 'es2019',
  });
}

buildSequence.forEach((buildItem) => {
  build(buildItem);
});