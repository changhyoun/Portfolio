import React, { useEffect, useState, useRef } from "react";
import Matter from "matter-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact, faSass, faSquareJs, faHtml5, faFigma,
} from "@fortawesome/free-brands-svg-icons";  // faReact는 free-brands-svg-icons에서 가져와야 합니다.
import {
  faImage, faBezierCurve, faObjectGroup, faFilePowerpoint, faFileExcel, faEllipsis, faCode,
} from "@fortawesome/free-solid-svg-icons";

const Page5_bt_lt_inner_tx = () => {
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const engineRef = useRef(null);  // engine을 한 번만 생성하도록 저장할 ref
  const renderRef = useRef(null);  // render도 한 번만 생성되도록 저장할 ref

  // 다양한 JSX 요소들을 처리하는 useEffect
  useEffect(() => {
    const createElements = () => {
      const newElements = [
        {
          content: (
            <div className="page5_bt_lt_txbox Photoshop_box">
              <FontAwesomeIcon icon={faImage} />
              <p>Photoshop</p>
            </div>
          ),
          key: "Photoshop",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Illustrator_box">
              <FontAwesomeIcon icon={faBezierCurve} />
              <p>Illustrator</p>
            </div>
          ),
          key: "Illustrator",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Indesign_box">
              <FontAwesomeIcon icon={faObjectGroup} />
              <p>Indesign</p>
            </div>
          ),
          key: "Indesign",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Powrpoint_box">
              <FontAwesomeIcon icon={faFilePowerpoint} />
              <p>Powrpoint</p>
            </div>
          ),
          key: "Powrpoint",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Excel_box">
              <FontAwesomeIcon icon={faFileExcel} />
              <p>Excel</p>
            </div>
          ),
          key: "Excel",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Figma_box">
              <FontAwesomeIcon icon={faFigma} />
              <p>Figma</p>
            </div>
          ),
          key: "Figma",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Jquery_box">
              <FontAwesomeIcon icon={faCode} />
              <p>Jquery</p>
            </div>
          ),
          key: "Jquery",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox react_box">
              <FontAwesomeIcon icon={faReact} />
              <p>React</p>
            </div>
          ),
          key: "React",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox scss_box">
              <FontAwesomeIcon icon={faSass} />
              <p>Scss</p>
            </div>
          ),
          key: "Scss",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Javascript_box">
              <FontAwesomeIcon icon={faSquareJs} />
              <p>Javascript</p>
            </div>
          ),
          key: "Javascript",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox Html_box">
              <FontAwesomeIcon icon={faHtml5} />
              <p>Html</p>
            </div>
          ),
          key: "Html",
        },
        {
          content: (
            <div className="page5_bt_lt_txbox etc_box">
              <FontAwesomeIcon icon={faEllipsis} />
              <p>etc..</p>
            </div>
          ),
          key: "etc",
        },
      ];

      setElements(newElements);
    };

    createElements();
  }, []);

  // Matter.js를 설정하는 useEffect
  useEffect(() => {
    if (elements.length > 0 && !engineRef.current) {
      const Engine = Matter.Engine;
      const Render = Matter.Render;
      const World = Matter.World;
      const Bodies = Matter.Bodies;
      const Runner = Matter.Runner;

      const params = {
        isStatic: true,
        render: {
          fillStyle: "transparent",
        },
      };

      const container = containerRef.current;
      const canvasSize = {
        width: container.offsetWidth,
        height: container.offsetHeight,
      };

      // Matter.js 엔진과 렌더링을 한 번만 생성
      engineRef.current = Engine.create({});
      renderRef.current = Render.create({
        element: container,
        engine: engineRef.current,
        options: {
          width: canvasSize.width,
          height: canvasSize.height,
          background: "transparent",
          wireframes: false,
        },
      });

      const floor = Bodies.rectangle(
        canvasSize.width / 2,
        canvasSize.height,
        canvasSize.width,
        50,
        params
      );
      const wall1 = Bodies.rectangle(0, canvasSize.height / 2, 50, canvasSize.height, params);
      const wall2 = Bodies.rectangle(canvasSize.width, canvasSize.height / 2, 50, canvasSize.height, params);
      const top = Bodies.rectangle(canvasSize.width / 2, 0, canvasSize.width, 50, params);

      const elementNodes = contentRef.current.querySelectorAll(".element");
      const elementBodies = [...elementNodes].map((elemRef) => {
        const width = elemRef.offsetWidth;
        const height = elemRef.offsetHeight;
        const safeWidth = canvasSize.width - width; // 화면에 맞게 안전한 가로 범위 계산
        const safeHeight = canvasSize.height - height; // 화면에 맞게 안전한 세로 범위 계산
        const randomX = Math.random() * safeWidth;  // 안전한 범위 내에서 랜덤한 X 위치 설정
        const randomY = Math.random() * safeHeight; // 안전한 범위 내에서 랜덤한 Y 위치 설정
      
        return {
          body: Bodies.rectangle(randomX,randomY, width, height, {
            render: {
              fillStyle: "transparent",
            },
          }),
          elem: elemRef,
          render() {
            const { x, y } = this.body.position;
            this.elem.style.top = `${y - 20}px`;
            this.elem.style.left = `${x - width / 2}px`;
            this.elem.style.transform = `rotate(${this.body.angle}rad)`;
          },
        };
      });

      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engineRef.current, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      World.add(engineRef.current.world, [
        floor,
        ...elementBodies.map((box) => box.body),
        wall1,
        wall2,
        top,
        mouseConstraint,
      ]);

      Runner.run(engineRef.current);
      Render.run(renderRef.current);

      // requestAnimationFrame 대신 Matter.js 엔진을 업데이트하여 애니메이션 유지
      (function rerender() {
        elementBodies.forEach((element) => {
          element.render();
        });
        Matter.Engine.update(engineRef.current);
        requestAnimationFrame(rerender);
      })();
    }
  }, [elements]);

  return (
    <div
      className="page5_bt_lt_inner"
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="content" ref={contentRef}>
        {elements.map((item) => (
          <div key={item.key} className="element" style={{ position: "absolute" }}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page5_bt_lt_inner_tx;
