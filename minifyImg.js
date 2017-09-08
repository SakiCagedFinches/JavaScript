minifyImg({
  files: files,
  minify: minify,
  canvas: cv,
  list: list
});



function minifyImg (param = {}) {
  let files = param.files || null;
  let list = param.list || null;
  let maxW = param.maxW || null, 
      maxH = param.maxH || null;
  let canvas = param.canvas || null,
      ctx = null;
  let minify = param.minify || 1;
  let download = [];
  let imgFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  if (canvas) {
    ctx = canvas.getContext('2d');
  }
  files.onchange = function () {
    for (let i of files.files) {
      draw(i);
    }
    document.querySelector('form').reset();
  }
  function draw(file) {
    let reader = new FileReader();
    if (!file) { return; }
    if(!imgFilter.test(file.type)){ alert('请上传图片'); }
    reader.readAsDataURL(file);
    reader.onerror = function (e){
      console.log(e)
    }
    reader.onload = function (e) {
      let img = document.createElement('img');    
      img.src = e.srcElement.result;
      img.onload = function () {
        let w = img.width,
            h = img.height;
        let proportion =  h / w;
        if (!maxH && !maxW) {
          maxH = h;
          maxW = w;
        }
        if (w > maxW) {
          w = maxW;
          h = w * proportion;
        }
        if (h > maxH) {
          h = maxH;
          w = h / proportion;
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        let miniUrl = canvas.toDataURL('image/jpeg', minify);
        let item = `<div class="item"><a href="${miniUrl}" download="${+new Date()}">${+new Date()}</a></div>`;
        list.innerHTML += item;
      }
    }
  }
}