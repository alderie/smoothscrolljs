class SmoothScroll {
  constructor(options = {}) {
    this.options = options;
    if(!options.target)
      throw new Error("Missing target element!");
    let speed = options.speed || 10, decayRate = options.decayRate || 0.95, pollRate = options.pollRate || 10;
    let targets = [...document.querySelectorAll(options.target)];
    this.intervals = [];
    let that = this;
    targets.forEach(elem=>{
      elem.style.height = "100%";
      elem.style.overflow = "hidden";
      let maxHeight = elem.scrollHeight;
      let state = 0;
      let vel = 0;
      that.intervals.push(setInterval(()=>{
        if(state==1) vel+=speed;
        else if (state==-1) vel-=speed;
        state = 0;
        vel*=decayRate;
        elem.scrollBy(0,vel);
      },pollRate));
      that.onWheel = (evt) =>{
        if(evt.deltaY>0) {
          state = 1;
          if(options.onScrollDown && typeof options.onScrollDown === "function")
              options.onScrollDown(evt);
        } else {
          state = -1;
          if(options.onScrollUp && typeof options.onScrollUp === "function")
              options.onScrollUp(evt);
        }
      }
      elem.addEventListener('wheel', that.onWheel);
    })
  }
  destroy() {
    for(let intId of this.intervals)
      clearInterval(intId);
    let targets = [...document.querySelectorAll(this.options.target)];
    targets.forEach(elem=>{
      elem.style.height = "inherit";
      elem.style.overflow = "inherit";
      elem.removeEventListener('wheel', this.onWheel)
    });
  }
}

