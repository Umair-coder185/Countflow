import React from "react";

const DROP = new Set([
  "initial",
  "animate",
  "exit",
  "variants",
  "transition",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "layout",
  "layoutId",
]);

function create(tag) {
  return function NoMotionComponent(props) {
    const { children, ...rest } = props || {};
    const filtered = {};
    Object.keys(rest).forEach((k) => {
      if (!DROP.has(k)) filtered[k] = rest[k];
    });
    return React.createElement(tag, filtered, children);
  };
}

const motion = new Proxy(
  {},
  {
    get: (_, tag) => create(tag),
  }
);

export const AnimatePresence = ({ children }) => children;
export { motion };
export default motion;
