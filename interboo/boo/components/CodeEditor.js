import Editor from '@monaco-editor/react';

export default function CodeEditor({ onChange }) {
  return (
    <Editor
      height="100%"
      defaultLanguage="cpp"
      defaultValue="// Write your C++ code here"
      onChange={onChange}
    />
  );
}