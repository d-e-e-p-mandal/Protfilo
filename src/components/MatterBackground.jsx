import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function MatterBackground() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    let render, runner;

    const init = () => {
      const { Engine, Render, Runner, World, Bodies, Body, Vector, Events } = Matter;

      const rect = sceneRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const engine = Engine.create();
      engineRef.current = engine;

      engine.gravity.y = 0;
      engine.velocityIterations = 10;
      engine.positionIterations = 10;

      render = Render.create({
        element: sceneRef.current,
        engine,
        options: {
          width,
          height,
          wireframes: false,
          background: "transparent",
          pixelRatio: window.devicePixelRatio,
        },
      });

      const wallOptions = { isStatic: true, restitution: 1.2, friction: 0 };
      const bounds = [
        Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
        Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
        Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
        Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions),
      ];

      const COLORS = ["#6b6b6b", "#8a8a8a", "#a3a3a3", "#7a6f63", "#9c8f7a"];

      const shapes = Array.from({ length: 40 }).map(() => {
        const size = 10 + Math.random() * 25;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];

        const options = {
          frictionAir: 0.002,
          restitution: 1.1,
          density: 0.001,
          render: { fillStyle: color },
        };

        const type = Math.floor(Math.random() * 4);
        let body;

        if (type === 0)
          body = Bodies.circle(Math.random() * width, Math.random() * height, size, options);
        else if (type === 1)
          body = Bodies.rectangle(Math.random() * width, Math.random() * height, size, size, options);
        else if (type === 2)
          body = Bodies.polygon(Math.random() * width, Math.random() * height, 3, size, options);
        else
          body = Bodies.polygon(Math.random() * width, Math.random() * height, 5, size, options);

        Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20,
        });

        return body;
      });

      World.add(engine.world, [...bounds, ...shapes]);

      const pointer = { x: width / 2, y: height / 2 };

      const updatePointer = (x, y) => {
        const r = sceneRef.current.getBoundingClientRect();
        pointer.x = x - r.left;
        pointer.y = y - r.top;
      };

      const onMouseMove = (e) => updatePointer(e.clientX, e.clientY);
      const onTouchMove = (e) => {
        if (e.touches[0]) {
          updatePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
      };

      sceneRef.current.addEventListener("mousemove", onMouseMove);
      sceneRef.current.addEventListener("touchstart", onTouchMove, { passive: true });
      sceneRef.current.addEventListener("touchmove", onTouchMove, { passive: true });

      Events.on(engine, "beforeUpdate", () => {
        shapes.forEach((body) => {
          const diff = Vector.sub(pointer, body.position);
          const dist = Vector.magnitude(diff);
          if (dist < 300 && dist > 0) {
            Body.applyForce(
              body,
              body.position,
              Vector.mult(Vector.normalise(diff), 0.001)
            );
          }
        });
      });

      Render.run(render);
      runner = Runner.create();
      Runner.run(runner, engine);

      return () => {
        sceneRef.current.removeEventListener("mousemove", onMouseMove);
        sceneRef.current.removeEventListener("touchstart", onTouchMove);
        sceneRef.current.removeEventListener("touchmove", onTouchMove);
      };
    };

    requestAnimationFrame(init);

    return () => {
      if (render) {
        Render.stop(render);
        render.canvas.remove();
      }
      if (runner) Runner.stop(runner);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 bg-[#050505]"
    />
  );
}