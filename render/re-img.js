import { ReComponent } from './ReComponent.js';

const CACHED_SRC_PRFX = 're-img-cache:';

export class ReImg extends ReComponent {

  applySrcset(src) {
    if (this.width) {
      this.img.srcset = `${src}-/resize/${this.width}x/ 1x, ${src}-/resize/${this.width * 2}x/ 2x`;
    } else if (this.height) {
      this.img.srcset = `${src}-/resize/x${this.height}/ 1x, ${src}-/resize/x${this.height * 2}/ 2x`;
    }
  }

  set src(srcVal) {
    if (!srcVal) {
      return;
    }
    this.img = document.createElement('img');

    if (this.hasAttribute('lazy')) {
      this.img.loading = 'lazy';
    };
    if (this.hasAttribute('w')) {
      let w = this.getAttribute('w');
      this.img.setAttribute('width', w);
      this.width = parseFloat(w);
    }
    if (this.hasAttribute('h')) {
      let h = this.getAttribute('h');
      this.img.setAttribute('height', h);
      this.height = parseFloat(h);
    }
    if (this.hasAttribute('alt')) {
      this.img.alt = this.getAttribute('alt');
    }
    let cachedSrc = window.localStorage.getItem(CACHED_SRC_PRFX + srcVal);
    if (cachedSrc) {
      this.applySrcset(cachedSrc);
      this.img.src = cachedSrc;
    } else {
      window.fetch(srcVal).then(async (imgResp) => {
        let file = await imgResp.blob();
        let data = new FormData();
        data.append('UPLOADCARE_PUB_KEY', this.getAttribute('pubkey') || 'demopublickey');
        data.append('UPLOADCARE_STORE', '1');
        data.append('file', file);
        window.fetch('https://upload.uploadcare.com/base/', {
          method: 'POST',
          body: data,
        }).then(async (resp) => {
          let imgData = await resp.json();
          let imgSrc = 'https://ucarecdn.com/' + imgData.file + '/-/format/auto/';
          this.applySrcset(imgSrc);
          this.img.src = imgSrc;
          window.localStorage.setItem(CACHED_SRC_PRFX + srcVal, imgSrc);
        });
      });
    }

    this.parentNode.insertBefore(this.img, this);
    this.remove();
  }

}

