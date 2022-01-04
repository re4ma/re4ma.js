import { ReHtm} from './re-htm.js';
import { RePeat} from './re-peat.js';
import { ReJs} from './re-js.js';
import { ReMd} from './re-md.js';
import { ReCss} from './re-css.js';
import { ReLoad } from './re-load.js';
import { ReImg } from './re-img.js';
import { ReCode } from './re-code.js';
import { ReLink } from './re-link.js';
import { ReAb } from './re-ab.js';
import { ReDoc } from './re-doc.js';

class ReSvg extends ReHtm {}

function regAll() {
  ReHtm.reg('re-htm');
  ReSvg.reg('re-svg');
  RePeat.reg('re-peat');
  ReJs.reg('re-js');
  ReMd.reg('re-md');
  ReCss.reg('re-css');
  ReImg.reg('re-img');
  ReLoad.reg('re-load');
  ReCode.reg('re-code');
  ReLink.reg('re-link');
  ReAb.reg('re-ab');
  ReDoc.reg('re-doc');
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
    window.requestAnimationFrame(() => {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'r' && e.ctrlKey) {
          e.preventDefault();
          window.fetch('./', {
            method: 'POST',
            body: JSON.stringify({
              type: 'save',
              path: document.location.pathname,
              html: '<!DOCTYPE html>\n' + document.documentElement.outerHTML,
            }),
          });
        }
      });
    });
  });
} else {
  regAll();
}

