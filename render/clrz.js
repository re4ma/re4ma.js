/**
 * 
 * @param {String} srcCode 
 * @returns {String}
 */
export function clrz(srcCode) {
  srcCode = srcCode
    .replace(/;/g, '&semi;') // must be on a first place
    .replace(/\//g, '&sol;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // if (!this.hasAttribute('highlight')) {
  //   return srcCode;
  // }
  let hlChars = [
    '=',
    '#',
    '$',
    '|',
    '{',
    '}',
    `'`,
    '`',
    `:`,
    `.`,
    `,`,
    `(`,
    `)`,
    `[`,
    `]`,
    '&lt;&sol;',
    '&lt;',
    '&gt;',
    '&semi;',
    '&quot;',
  ];
  hlChars.forEach((char) => {
    srcCode = srcCode.split(char).join(`<span class="hl">${char}</span>`);
  });

  srcCode = srcCode
    .split('&sol;*').join('<span class="comment">&sol;*')
    .split('*&sol;').join('*&sol;</span>')
    .split('&sol;&sol; ').map((subStr, idx) => {
      return idx ? subStr.replace('\n', '</span>\n') : subStr;
    }).join('<span class="comment">&sol;&sol; ');
  return srcCode;
};