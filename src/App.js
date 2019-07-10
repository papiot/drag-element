import React from 'react';
import logo from './logo.svg';
import './App.css';

let movingBox = React.createRef(); 
let draggingArea = React.createRef();
let dragging = false;

let componentOffset = 0;

function App() {

  function getPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        let yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    }
  }

  function handleOnMouseUp(e) {
    dragging = false;
  }

  function handleOnMouseMove(e) {
    if (dragging) {
      let parentPosition = getPosition(e.currentTarget);

      let xPosition = e.clientX - parentPosition.x - componentOffset;
      let yPosition = e.clientY - parentPosition.y - componentOffset;

      // Left border check
      if ((e.clientX - componentOffset) < parentPosition.x) {
        xPosition = 0;
      }

      // Right border check
      if ((e.clientX + componentOffset) > (draggingArea.current.clientWidth + parentPosition.x)) {
        xPosition = draggingArea.current.clientWidth - componentOffset * 2;
      }

      // Upper border check
      if ((e.clientY - componentOffset) < parentPosition.y) {
        yPosition = 0;
      }

      // Lower border check
      if ((e.clientY + componentOffset) > (draggingArea.current.clientHeight + parentPosition.y)) {
        yPosition = draggingArea.current.clientHeight - componentOffset * 2;
      }

      movingBox.current.style.left = xPosition + "px";
      movingBox.current.style.top = yPosition + "px";
    }
  }

  function handleOnMouseDown(e) {
    componentOffset = Math.round(movingBox.current.clientWidth / 2);

    let parentPosition = getPosition(e.currentTarget);

    let xPosition = e.clientX - parentPosition.x - componentOffset;
    let yPosition = e.clientY - parentPosition.y - componentOffset;

    movingBox.current.style.left = xPosition + "px";
    movingBox.current.style.top = yPosition + "px";

    dragging = true;
  }

  return (
    <div className="App">
      <div 
        onMouseUp={(e) => handleOnMouseUp(e)}
        onMouseMove={(e) => handleOnMouseMove(e)}
        onMouseDown={(e) => handleOnMouseDown(e)} 
        ref={draggingArea}
        style={{left: '100px', position: 'relative', width: '400px', height: '400px', backgroundColor: 'yellow'}}>
        <div ref={movingBox} style={{position: 'absolute', width: '60px', height: '60px', backgroundColor: 'green'}}>
          poop
        </div>
      </div>
    </div>
  );
}

export default App;
