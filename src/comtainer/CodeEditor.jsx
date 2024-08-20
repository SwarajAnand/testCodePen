import React from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeEditor = ({ language, value, onChange }) => (
  <ResizableBox
    width={500}
    height={400}
    axis="x" 
    minConstraints={[150, 200]}
    maxConstraints={[800, 800]}
    className="resize-box"
    // resizeHandles={['se', 'sw', 'ne', 'nw']} 
  >
    <div className="flex-1 flex flex-col h-full">
      <div className="w-full flex items-center justify-between">
        <div className="bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500">
          {language.icon}
          <p className="text-primaryText font-semibold">{language.name}</p>
        </div>
      </div>
      <div className="flex-1 px-2">
        <CodeMirror
          value={value}
          height="100%"
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          theme={"dark"}
        />
      </div>
    </div>
  </ResizableBox>
);

export default CodeEditor;
