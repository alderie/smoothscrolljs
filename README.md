# Smooth Scroll JS
Smooth scrolling within certain elements or for the whole page regardless of mouse input

# Usage
```javascript
let scroller = new SmoothScroll({ target: 'html' })
```

# Additional Options
```javascript
let scroller = new SmoothScroll({ 
  target: 'html' //Regular query selector
  speed: 10 //Speed increase caused by scrolling with mouse
  decayRate: 0.95 //Rate at which speed decays
  pollRate: 10 //Millisecond delay between each update for the speed
  onScrollUp: (func) //Triggered when the user scrolls up
  onScrollDown: (func) //Triggered when the user scrolls down
})

//Additional method to destroy all timers and event listeners
scroller.destroy();
```
