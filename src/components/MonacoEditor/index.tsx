import Editor, { loader } from "@monaco-editor/react";
import { useApp } from "@/store/useApp";
import { useStored } from "@/store/useStored";

loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs",
  },
});

const editorOptions = {
  formatOnPaste: true,
  formatOnType: true,
  minimap: {
    enabled: false,
  },
};

export default function MonacoEditor() {
  const contents = useApp((state) => state.contents);
  const setContents = useApp((state) => state.setContents);
  const setError = useApp((state) => state.setError);
  const lightmode = useStored((state) => state.lightmode);

  return (
    <Editor
      className="h-screen md:h-full"
      language="json"
      height="100%"
      theme={lightmode ? "light" : "vs-dark"}
      value={contents}
      options={editorOptions}
      onValidate={(errors) => setError(errors[0]?.message)}
      onChange={(contents) => setContents({ contents, skipUpdate: true })}
    />
  );
}
