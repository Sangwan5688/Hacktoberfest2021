import React, { useEffect, useMemo, useState } from "react";

// Constants
const POLYGON_SIZE = 100;

function LudoBoard({ playerCount, SVG_SIZE }) {
  const CIRCLE_RADIUS = SVG_SIZE / 2 - 4;
  const [k, sk] = useState(null);
  const [t, setT] = useState(null);
  const [d, sd] = useState(20);
  const [f, sf] = useState(true);
  const [toggle, setToggle] = useState(true);

  function handleAnimation(index) {
    setT(Math.floor(Math.random() * 6) + 1 + index+30);
    sk(index);
  }
  let kk = null;
  let kkk = null;
  useEffect(() => {
    if (k) {
      clearInterval(kk);
      if (k == t) sk(null);
      kk = setInterval(() => {
        sk((p) => (p + 1) % (playerCount * 18));
        setToggle(p=>!p)
      }, [300]);
    } else {
      clearInterval(kk);
    }
    return () => clearInterval(kk);
  }, [k]);
  // useEffect(()=>{
  //   clearInterval(kkk)
  //   if(d>25) sf(false);
  //   if(d<20) sf(true);
  //   kkk=setInterval(()=>{sd(p=>f?p+0.5:p-0.5)},100);
  //   return ()=>clearInterval(kkk);
  // },[d])

  const numberWiseColor = [
    "red",
    "green",
    "orange",
    "blue",
    "yellow",
    "purple",
  ];

  //................MEMOIZATION..........................................

  // Generate polygon coordinates
  const polygonData = useMemo(() => {
    return generatePolygonCoordinates(
      SVG_SIZE / 2,
      SVG_SIZE / 2,
      playerCount,
      POLYGON_SIZE
    );
  }, [playerCount]);

  // Generate smaller polygon coordinates
  const polygonDataSmall = useMemo(() => {
    return generatePolygonCoordinates(
      SVG_SIZE / 2,
      SVG_SIZE / 2,
      playerCount,
      POLYGON_SIZE / 1.4
    );
  }, [playerCount]);

  // Generate line coordinates
  const lineCoordinates = useMemo(() => {
    return generateLineCorinates(playerCount, polygonData);
  }, [playerCount, polygonData]);

  // Generate boxes from line coordinates for playerMove
  const boxes = useMemo(() => {
    return generateBoxesFromLineCoordinates();
  }, [lineCoordinates, k]);

  //genereting marker points for player move in boxes
  const markers = useMemo(() => {
    return generateDropdownMarker();
  }, [boxes]);

  // Generate triangle coordinates for player boxes
  const [triangleCoordsArray, triangleCoordsStringArray] = useMemo(() => {
    return generateTriangleCordForPlayerBox();
  }, [lineCoordinates]);

  // Generate inner triangle coordinates for player boxes
  const triangleInnerCordsArray = useMemo(() => {
    return generateInnerTriangleCordForPlayerBox();
  }, [lineCoordinates]);

  // Generate circle coordinates for player House boxes goti
  const circleCoordinates = useMemo(() => {
    return generateCircleCordForPlayer();
  }, [triangleCoordsArray]);

  //generate win box line cord
  const winBoxCordLine = useMemo(() => {
    return generateWinBoxCord();
  }, [polygonData, polygonDataSmall]);

  const starCords = useMemo(() => {
    return generateStarPolygon();
  }, [boxes]);

  //----------------------FUNCTIIONS------------------------------------
  function generatePolygonCoordinates(cx, cy, sides, size) {
    const coordinates = [];

    // Calculate the coordinates for the board cells from polygon vertices with the help of circle

    const angleIncrement = (2 * Math.PI) / sides;

    //main polygon points
    const x = cx + size * Math.cos(0);
    const y = cy + size * Math.sin(0);
    coordinates.push({ x, y });

    for (let i = 1; i < sides; i++) {
      const x = cx + size * Math.cos(i * angleIncrement);
      const y = cy + size * Math.sin(i * angleIncrement);

      const [m1, n1, m2, n2] = generateTwoMidPointsBetweenTwoPoints(
        coordinates[coordinates.length - 1].x,
        coordinates[coordinates.length - 1].y,
        x,
        y
      );
      coordinates.push({ x: m1, y: n1 }, { x: m2, y: n2 });

      coordinates.push({ x, y });
    }
    const [m1, n1, m2, n2] = generateTwoMidPointsBetweenTwoPoints(
      coordinates[coordinates.length - 1].x,
      coordinates[coordinates.length - 1].y,
      coordinates[0].x,
      coordinates[0].y
    );
    coordinates.push({ x: m1, y: n1 }, { x: m2, y: n2 });

    return coordinates;
  }

  //generating eachline cordinate
  function generateLineCorinates() {
    const corner = [];
    const side = [];
    const rot = playerCount / 2 - 1;
    const cord = [];

    for (let i = 0; i < polygonData.length; i++) {
      if (i % 3 === 0) {
        const { x: x1, y: y1 } = polygonData[i];
        const { x: x3, y: y3 } = polygonData[determineIndex(i)];
        const { x: x4, y: y4 } = polygonData[cornerIndex(i)];

        const [frontCord] = calculateLinePoints(x1, y1, x3, y3);
        const [cornerFrontCord] = calculateLinePoints(x1, y1, x4, y4);

        corner.push(frontCord, cornerFrontCord);
      } else {
        const { x: x1, y: y1 } = polygonData[i];
        const { x: x3, y: y3 } = polygonData[determineIndex(i)];
        const [frontCord] = calculateLinePoints(x1, y1, x3, y3);

        side.push(frontCord);
      }
    }

    for (let i = 0; i < corner.length; i += 2) {
      cord.push(
        corner[i],
        corner[(i + 1) % corner.length],
        side[i],
        side[(i + 1) % corner.length]
      );
    }

    function calculateLinePoints(x1, y1, x3, y3) {
      const frontCord = [[x1, y1]];
      const backCord = [[x3, y3]];

      for (let j = 1; j <= 6; j++) {
        const p = extendLine(x1, y1, x3, y3, 50 * j);

        frontCord.push([p[0], p[1]]);
        backCord.push([p[2], p[3]]);
      }
      return [frontCord, backCord];
    }

    function determineIndex(i) {
      const cornerPointIdx = (i + 3 * rot) % polygonData.length;
      const midPointFirst = (i + 4 + 3 * rot) % polygonData.length;
      const midPointSecond = (i + 2 + 3 * rot) % polygonData.length;

      return i % 3 === 0
        ? cornerPointIdx
        : i % 3 === 1
        ? midPointFirst
        : midPointSecond;
    }

    function cornerIndex(i) {
      return (i + 3 * (rot + 2)) % polygonData.length;
    }

    function extendLine(x1, y1, x2, y2, extensionLength) {
      // Calculate the direction vector of the line
      const dx = x2 - x1;
      const dy = y2 - y1;

      // Calculate the length of the direction vector
      const length = Math.sqrt(dx * dx + dy * dy);

      // Normalize the direction vector
      const normalizedDx = dx / length;
      const normalizedDy = dy / length;

      // Extend the line in both directions

      const X1 = x1 - extensionLength * normalizedDx;
      const Y1 = y1 - extensionLength * normalizedDy;

      const X2 = x2 + extensionLength * normalizedDx;
      const Y2 = y2 + extensionLength * normalizedDy;

      return [X1, Y1, X2, Y2];
    }

    return cord;
  }

  // Generate boxes from line coordinates for playerMove
  function generateBoxesFromLineCoordinates() {
    const board = [];
    const boardCellArray = generateLineCorinates();

    for (let i = 0; i < boardCellArray.length; i++) {
      if (i % 4 === 0) continue;
      const box = [];
      for (let j = 0; j < boardCellArray[i].length - 1; j++) {
        const p1 = [boardCellArray[i][j][0], boardCellArray[i][j][1]];
        const p2 = [
          boardCellArray[(i + 1) % boardCellArray.length][j][0],
          boardCellArray[(i + 1) % boardCellArray.length][j][1],
        ];
        const p3 = [
          boardCellArray[(i + 1) % boardCellArray.length][j + 1][0],
          boardCellArray[(i + 1) % boardCellArray.length][j + 1][1],
        ];
        const p4 = [boardCellArray[i][j + 1][0], boardCellArray[i][j + 1][1]];

        box.push(
          `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} ${p4[0]},${p4[1]}`
        );
      }

      board.push(box);
    }

    //rearranging the array for right direction
    return board
      .map((ele, i) => (i % 3 !== 0 ? ele.reverse() : ele))
      .reduce((acc, curr) => {
        acc.push(...curr);
        return acc;
      }, []);
  }

  // Generate midpoints between two points
  function generateTwoMidPointsBetweenTwoPoints(x1, y1, x2, y2) {
    // Calculate the direction vector from (x1, y1) to (x2, y2)
    const dirX = x2 - x1;
    const dirY = y2 - y1;

    // Calculate the distance between (x1, y1) and (x2, y2)
    const distance = Math.sqrt(dirX * dirX + dirY * dirY);

    // Calculate the coordinates of (x3, y3) and (x4, y4) at equal distances from the endpoints
    const d = distance / 3; // Divide by 3 to get one-third of the distance

    const x3 = x1 + (dirX * d) / distance;
    const y3 = y1 + (dirY * d) / distance;

    const x4 = x1 + (2 * dirX * d) / distance;
    const y4 = y1 + (2 * dirY * d) / distance;

    return [x3, y3, x4, y4];
  }

  //Extracting triangle structucture point for each player Box area
  function generateTriangleCordForPlayerBox() {
    const resultCordinatesString = [];
    const resultCordinatesArray = [];
    const cord = lineCoordinates.filter((_, i) => i % 4 === 0 || i % 4 === 1);

    for (let idx = 0; idx < cord.length; idx += 2) {
      const [p1, p2] = cord[idx][0];
      const [q1, q2] = cord[idx][6];
      const [r1, r2] = cord[(idx + 1) % cord.length][6];

      const point = `${p1},${p2} ${q1},${q2} ${r1},${r2}`;
      resultCordinatesArray.push([
        [p1, p2],
        [q1, q2],
        [r1, r2],
      ]);
      resultCordinatesString.push(point);
    }

    return [resultCordinatesArray, resultCordinatesString];
  }

  //Extracting circle codinates from Triangle cordinates, returning array
  function generateCircleCordForPlayer() {
    return triangleCoordsArray.map((cord) => {
      return calculateInnerEquilateralTriangle(cord);
    });

    function calculateInnerEquilateralTriangle(vertices) {
      const center = calculateCenter(vertices);

      // Calculate the coordinates of the midpoints between the center and the vertices
      const p1 = [
        (vertices[0][0] + center[0]) / 2,
        (vertices[0][1] + center[1]) / 2,
      ];

      const p2 = [
        (vertices[1][0] + center[0]) / 2,
        (vertices[1][1] + center[1]) / 2,
      ];

      const p3 = [
        (vertices[2][0] + center[0]) / 2,
        (vertices[2][1] + center[1]) / 2,
      ];

      return [p1, p2, p3, center];
    }

    function calculateCenter(vertices) {
      // Calculate the average x and y coordinates of the vertices
      const sumX = vertices.reduce((sum, vertex) => sum + vertex[0], 0);
      const sumY = vertices.reduce((sum, vertex) => sum + vertex[1], 0);
      const centerX = sumX / vertices.length;
      const centerY = sumY / vertices.length;
      return [centerX, centerY];
    }
  }

  function generateInnerTriangleCordForPlayerBox() {
    return triangleCoordsArray.map((cord) => {
      return calculateInnerEquilateralTriangle(cord);
    });

    function calculateInnerEquilateralTriangle(vertices) {
      const center = calculateCenter(vertices);
      const len = 27;
      // Calculate the coordinates of the midpoints between the center and the vertices
      const p1 = [
        (vertices[0][0] + center[0]) / 2,
        (vertices[0][1] + center[1]) / 2,
      ];

      const p2 = [
        (vertices[1][0] + center[0]) / 2,
        (vertices[1][1] + center[1]) / 2,
      ];

      const p3 = [
        (vertices[2][0] + center[0]) / 2,
        (vertices[2][1] + center[1]) / 2,
      ];

      return `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`;
    }

    function calculateCenter(vertices) {
      // Calculate the average x and y coordinates of the vertices
      const sumX = vertices.reduce((sum, vertex) => sum + vertex[0], 0);
      const sumY = vertices.reduce((sum, vertex) => sum + vertex[1], 0);
      const centerX = sumX / vertices.length;
      const centerY = sumY / vertices.length;
      return [centerX, centerY];
    }
  }

  function generateWinBoxCord() {
    let res = [];
    for (let i = 0; i < polygonData.length; i += 3) {
      const { x: x1, y: y1 } = polygonData[i];
      const { x: x2, y: y2 } = polygonDataSmall[i];
      const { x: x3, y: y3 } = polygonDataSmall[(i + 3) % polygonData.length];
      const { x: x4, y: y4 } = polygonData[(i + 3) % polygonData.length];

      res.push(`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
    }
    return res;
  }

  function generateStarPolygon() {
    return boxes
      .filter((_, idx) => idx % 18 === 3)
      .map((cord, idx) => generateCords(cord, idx));

    function generateCords(coordinates, idx) {
      // Split the coordinates string into an array of values
      const coordsArray = coordinates
        .split(" ")
        .map((coord) => coord.split(",").map(parseFloat));

      const outerRange =
        idx === 0 ||
        idx === playerCount / 2 ||
        idx === playerCount / 2 - 1 ||
        idx === playerCount - 1
          ? 2 * playerCount * 0.16
          : 1;

      // Destructure the coordinates into individual variables
      const [x1, y1, x2, y2, x3, y3, x4, y4] = coordsArray.flat();

      // Calculate the center of the rectangle
      const centerX = (x1 + x3) / 2;
      const centerY = (y1 + y3) / 2;

      // Calculate the width and height of the rectangle
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y4 - y1);

      // Calculate the maximum radius that will fit within the rectangle
      const maxRadius = Math.min(width / 2, height / 2);

      // Define the number of points for the star
      const numPoints = 5;

      // Define the length of the inner and outer points based on maxRadius
      const innerRadius = maxRadius / 2; // Adjust this value for the inner radius
      const outerRadius = maxRadius * outerRange; // Adjust this value for the outer radius

      // Initialize an array to store the polygon points
      const points = [];

      for (let i = 0; i < numPoints * 2; i++) {
        const angle = (i * Math.PI) / numPoints; // Angle between points

        // Calculate coordinates for inner and outer points
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const pointX = centerX + radius * Math.cos(angle);
        const pointY = centerY + radius * Math.sin(angle);

        points.push([pointX, pointY]);
      }

      // Convert the points array back to a single string
      const pointsString = points.map((point) => point.join(",")).join(" ");

      return pointsString;
    }
  }

  //genereting marker points for player move in boxes
  function generateDropdownMarker() {
    return boxes.map((cord) => generateCords(cord));

    function generateCords(rectanglePoints) {
      //converting cord from string array of floats
      const point = rectanglePoints
        .split(" ")
        .map((cord) => cord.split(","))
        .flat()
        .map((p) => parseFloat(p));

      const [x1, y1, x2,y2, x3, y3,x4,y4] = point;

      const midX = (x1 + x3) / 2;
      const midY = (y1 + y3) / 2;

      // Define the size and appearance of the pin drop marker
      const headRadius =15; // calculating radius based on the width of the rectangle
      const leftShift = 40;
      // Generate the coordinates for the pin head
      const headCoordinates = generateCircleCoordinates(
        midX - leftShift,
        midY,
        headRadius,
        leftShift
      );

      return {headCoordinates, headCircle: [midX-leftShift,midY], tailCircle: [midX,midY]};
    }

    function generateCircleCoordinates(centerX, centerY, radius, leftShift) {
      const numPoints = 20; // Number of points to approximate the circle
      const points = [];

      //intial marker starting point
      points.push([centerX + leftShift+7, centerY]);

      for (let i = 0; i < numPoints; i++) {
        if(i===5 || i===16) {
          const angle = (i * Math.PI * 2) / numPoints;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          points.push([x, y]);
        }
      }


      //end marker point
      //points.push([centerX, centerY]);

      // Convert the points array back to a single string
      const coordinates = points.map((point) => point.join(",")).join(" ");

      return coordinates;
    }
  }
  const {x:x1,y:y1} = polygonData[0];
  const { x: x2, y: y2 } = polygonData[1];
  const boxRadius = Math.sqrt((x1 - x2)*(x1-x2) + (y1-y2)*(y1-y2)) / 3;

  console.log("k");

  return (
    <div>
      <svg width={SVG_SIZE} height={SVG_SIZE}>
        {/* Draw the square */}
        <rect
          x="0"
          y="0"
          width={SVG_SIZE}
          height={SVG_SIZE}
          fill="none"
          stroke="black" // Outline color
          strokeWidth="2" // Outline width
        />
        {/* Draw the circle */}
        <circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />

        <text
          x={SVG_SIZE / 2 - (playerCount <10 ? 30: 60)}
          y={SVG_SIZE / 2 + 40}
          fill="black"
          style={{ fontFamily: "Arial", fontSize: "100px" }}
        >
          {playerCount}
        </text>

        {/* main board each cell rendering for goti move*/}
        {boxes.map((box, idx) => (
          <polygon
            key={idx}
            onClick={() => handleAnimation(idx)}
            points={box}
            fill={
              (Math.floor(idx / 6) % 3 === 1 && idx % 6 !== 0) ||
              (Math.floor(idx / 6) % 3 === 2 && idx % 6 === 1)
                ? numberWiseColor[(Math.floor(idx / 18) + 1) % 6]
                // : k === idx
                // ? "black"
                : "white"
            }
            stroke="black"
            strokeWidth="1"
            style={{ cursor: "pointer" }}
          />
        ))}

        {/* Draw the polygon */}
        <polygon
          points={polygonData.map(({ x, y }) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="green"
          strokeWidth="2"
        />

        {/* Draw the amller polygon */}
        <polygon
          points={polygonDataSmall.map(({ x, y }) => `${x},${y}`).join(" ")}
          fill="none"
          stroke="green"
          strokeWidth="2"
        />

        {/* Draw the win box line */}
        {winBoxCordLine.map((cord, idx) => (
          <polygon
            key={idx}
            points={cord}
            fill={numberWiseColor[(idx + 1) % playerCount]}
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* Render triangles for player House boxes */}
        {triangleCoordsStringArray.map((cord, idx) => (
          <polygon
            key={idx}
            points={cord}
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* Render inner triangles for player House boxes */}
        {triangleInnerCordsArray.map((cord, idx) => (
          <polygon
            key={idx}
            points={cord}
            fill={numberWiseColor[idx]}
            stroke="black"
            strokeWidth="1"
          />
        ))}

        {/* extra just for cover of design*/}
        {circleCoordinates.map((cord, i) =>
          cord.map(
            (point, idx) =>
              idx === 3 && (
                <circle
                  key={idx}
                  cx={point[0]}
                  cy={point[1]}
                  r={30}
                  fill="white"
                />
              )
          )
        )}

        {/* Render circles for each player House boxes goti*/}
        {circleCoordinates.map((cord, i) =>
          cord.map((point, idx) => (
            <circle
              key={idx}
              cx={point[0]}
              cy={point[1]}
              r={d}
              stroke="black"
              fill={numberWiseColor[i]}
              strokeWidth="3"
            />
          ))
        )}

        {/* Render and marking special cells*/}
        {starCords.map((cord, idx) => (
          <polygon
            key={idx}
            points={cord}
            fill={numberWiseColor[(idx + 1) % playerCount]}
            stroke={numberWiseColor[(idx + 1) % playerCount]}
            strokeWidth="2"
          />
        ))}

        {/* experiment*/}
        {circleCoordinates.map((cord, i) =>
          cord.map(
            (point, idx) =>
              idx === 6 && (
                <circle
                  key={idx}
                  cx={point[0]}
                  cy={point[1]}
                  r={85}
                  stroke="black"
                  fill={numberWiseColor[i]}
                  strokeWidth="3"
                />
              )
          )
        )}

        {/* rendering marker for player move, mrker ->haid,marker,tail*/}
        {markers.map((cord, idx) => (
          idx===k&&<circle
            key={idx}
            cx={cord.tailCircle[0]}
            cy={cord.tailCircle[1]}
            r={(toggle ? 6 : 0) + boxRadius}
            fill="none"
            stroke="red"
            strokeWidth="2"
          />
        ))}
        {markers.map((cord, idx) => (
          idx===k&&<polygon
            key={idx}
            points={cord.headCoordinates}
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
        ))}
        {markers.map((cord, idx) => (
          idx===k&&<circle
            key={idx}
            cx={cord.headCircle[0]}
            cy={cord.headCircle[1]}
            r={(toggle ? 6 : 0) + boxRadius + 5}
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
        ))}
        {markers.map((cord, idx) => (
          idx===k&&<circle
            key={idx}
            cx={cord.headCircle[0]}
            cy={cord.headCircle[1]}
            r={(toggle ? 6 : 0) + boxRadius + 2}
            fill={numberWiseColor[(Math.floor(idx / 18) + 1) % 6]}
            stroke="black"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}

export default LudoBoard;
