import { useEffect } from "react";
import { GUI } from "dat.gui";

interface UseGUIProps<T> {
  state: T;
  setState: (newState: T) => void;
}

export default function UseGUI<T extends object>({
  state,
  setState,
}: UseGUIProps<T>) {
  useEffect(() => {
    console.log("Test, rerender");

    const guiWrapper = document.createElement("div");
    document.body.append(guiWrapper);
    guiWrapper.style.position = "absolute";
    guiWrapper.style.top = "0";
    guiWrapper.style.left = "0";

    const gui = new GUI();
    guiWrapper.appendChild(gui.domElement);
    gui.width = 500;

    addToGUI(gui, state, "");

    return () => guiWrapper.remove();
  }, []);

  function addToGUI<T>(
    gui: GUI,
    parentValue: NonNullable<T>,
    key: keyof T | ""
  ) {
    if (typeof parentValue !== "object") return;

    if (key === "") {
      const parentKeys = Object.keys(parentValue) as Array<keyof T>;
      parentKeys.forEach((key) => addToGUI(gui, parentValue, key));
      return;
    }

    const value = parentValue[key] as NonNullable<T[keyof T]>;
    if (typeof value !== "object") {
      const controller = gui.add(parentValue, key);

      //Doesn't work if value is further down the recursion tree
      controller.onChange((newValue) =>
        setState({ ...state, [key]: newValue })
      );
      return;
    }

    const valueKeys = Object.keys(value) as Array<keyof typeof value>;
    const folder = gui.addFolder(key as string);

    valueKeys.forEach((innerKey) =>
      addToGUI(folder, value as NonNullable<T[keyof T]>, innerKey)
    );
  }
}
