const keyMap = {
  Space: 'space',
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right',
  Enter: 'enter',
};

export class KeyEventHandler
{
  constructor(graph)
  {
    this.graph = graph
    if(!KeyEventHandler.instance){
      this.keys = {
        up: { pressed: false, doubleTap: false, timestamp: 0 },
        left: { pressed: false, doubleTap: false, timestamp: 0 },
        down: { pressed: false, doubleTap: false, timestamp: 0 },
        right: { pressed: false, doubleTap: false, timestamp: 0 },
        space: { pressed: false, doubleTap: false, timestamp: 0 },
        enter: { pressed: false, doubleTap: false, timestamp: 0 },
      };

      window.addEventListener('keydown', (event) => this.onkeydown(event));
      window.addEventListener('keyup', (event) => this.onkeyup(event));
      KeyEventHandler.instance = this;
    }
    return KeyEventHandler.instance;
  }

  onkeydown(event)
  {
      const key = keyMap[event.code];
      if (!key) return;
      this.keys[key].pressed = true;
  }

  onkeyup(event)
  {
      const key = keyMap[event.code];
      if (!key) return;
      this.keys[key].pressed = false;
  }
}