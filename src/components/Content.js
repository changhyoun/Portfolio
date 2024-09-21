export class Content {
  constructor(DOM_el) {
    this.DOM = {
      el: DOM_el,
      canvas: null,
    };

    this.imageSrc = this.DOM.el.src;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.DOM.el.parentElement.appendChild(this.canvas); // img의 부모 요소에 canvas를 추가

    this.img = new Image();
    this.img.src = this.imageSrc;

    this.img.onload = () => {
      this.setCanvasSize();
      this.render();
    };
  }

  setCanvasSize() {
    const rect = this.DOM.el.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  render() {
    const rect = this.DOM.el.getBoundingClientRect();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.img, 0, 0, rect.width, rect.height);
  }

  animatePixels() {
    const rect = this.DOM.el.getBoundingClientRect();
    let pixelFactor = 30; // 초기 큰 픽셀 크기 설정
    const interval = setInterval(() => {
      if (pixelFactor <= 1) {
        clearInterval(interval);
        return;
      }

      pixelFactor--;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.img,
        0, 0, rect.width / pixelFactor, rect.height / pixelFactor,
        0, 0, rect.width, rect.height
      );
    }, 100);
  }
}
