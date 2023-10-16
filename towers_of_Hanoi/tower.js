let counter = 0;

let pegs = [];
let diskArray = []; // this stores the disks
const game = document.getElementById('game');


function plotAll(pegMap) {
  pegArray.map((peg, pegindex) => {
    // loop over all pegs
    let disks = pegMap[peg]; // the array of disks on pegMap.A for example
    if (disks.length > 0) {
      disks.map((disk, index) => {
        pickDisk = diskArray.filter((item) => {
          // pick out correct disk from diskArray
          return item.id == disk;
        });
        positionDisk(pickDisk[0].newdiv, disk, index, pegindex); // disk is the disk number where larger is wider disk
      });
    }
  });
}

function positionDisk(domdiv, diskNumber, indexOnPeg, pegindex) {
  // set its position
  let pegCenter = 300 * pegindex + 100;
  let diskWidth = diskNumber * 40 + 20;
  let base = 400;
  let diskHeight = 20;

  domdiv.style.left = pegCenter - diskWidth / 2;
  domdiv.style.width = diskWidth;
  domdiv.style.top = 400 - diskHeight * indexOnPeg;
  console.log('Disk:' + diskNumber + ' at top: ' + domdiv.style.top);
  domdiv.style.height = diskHeight;
  domdiv.innerHTML = '  ' + diskNumber;
}
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function diskFactory(id, indexOnPeg, pegNumber, type) {
  // this determines start positions
  let newdiv = document.createElement('div');
  positionDisk(newdiv, id, indexOnPeg, pegNumber);
  newdiv.setAttribute('class', type); // these are the pegs
  newdiv.setAttribute('id', id);
  game.appendChild(newdiv);
  return {
    id,
    newdiv,
  };
}

function pegFactory(id, indexOnPeg, pegNumber, type) {
  // this determines start positions
  let newdiv = document.createElement('div');
  newdiv.setAttribute('class', 'peg'); // these are the pegs
  newdiv.setAttribute('id', id);
  let pegCenter = 300 * pegNumber + 60;
  let base = 400;
  let diskHeight = 200;
  newdiv.style.left = pegCenter;
  newdiv.style.width = 20;
  newdiv.style.top = 200;
  newdiv.style.height = 200;
  game.appendChild(newdiv);
}

function initializeDisks(pegMap) {
  let disks = pegMap[pegArray[0]]; // all disks start on peg 0
  diskArray = disks.map((diskid, indexOnPeg) => {
    // this is a kind of shadow DOM
    return diskFactory(diskid, indexOnPeg, 0, 'disk');
  });
  pegArray.map((item, pegId) => {
    pegFactory(pegId, 0, pegId, 'peg');
  });
}

function makeMove() {
  if (counter == 0) {
    // const nDisks = 5;
    var input=document.getElementById('numDisk').value;
    initialize(input, pegMap);
    moveDisks(input, 'A', 'C', 'B');
    initializeDisks(pegHist[0]);
  }
  if (counter < pegHist.length) {
    plotAll(pegHist[counter]);
  } else {
    alert('Tower is Finished');
  }
  counter++;
}
