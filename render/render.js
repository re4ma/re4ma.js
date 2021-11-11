import {ReHtm} from './re-htm.js';
import {RePeat} from './re-peat.js';
import {ReJs} from './re-js.js';
import {ReMd} from './re-md.js';
import {ReCss} from './re-css.js';
import {ReImg} from './re-img.js';
import {ReCode} from './re-code.js';

class ReSvg extends ReHtm {}

function regAll() {
  ReHtm.reg('re-htm');
  ReSvg.reg('re-svg');
  RePeat.reg('re-peat');
  ReJs.reg('re-js');
  ReMd.reg('re-md');
  ReCss.reg('re-css');
  ReImg.reg('re-img');
  ReCode.reg('re-code');
};

const TPL_ATTR = 're-tpl';
const script = document.querySelector(`script[${TPL_ATTR}]`);
if (script) {
  let tplSrc = script.getAttribute(TPL_ATTR);
  window.fetch(tplSrc).then(async (resp) => {
    let tplTxt = await resp.text();
    tplTxt = tplTxt.replace('{{CONTENT}}', document.body.innerHTML);
    [...script.attributes].forEach((attr) => {
      if (attr.name.startsWith('--')) {
        let propName = attr.name.replace('--', '').toUpperCase();
        tplTxt = tplTxt.replace(`{{${propName}}}`, attr.value);
      }
    });
    let newDoc = document.open();
    newDoc.write(tplTxt);
    newDoc.close();
    regAll();
  });
} else {
  regAll();
}

