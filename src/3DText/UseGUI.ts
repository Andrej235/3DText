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
    key: keyof T | "",
    history: string[] = []
  ) {
    if (typeof parentValue !== "object") return;

    if (key === "") {
      const parentKeys = Object.keys(parentValue) as Array<keyof T>;
      parentKeys.forEach((key) => addToGUI(gui, parentValue, key));
      return;
    }

    const value = parentValue[key] as NonNullable<T[keyof T]>;
    if (typeof value === "object") {
      const valueKeys = Object.keys(value) as Array<keyof typeof value>;
      const folder = gui.addFolder(key as string);

      valueKeys.forEach((innerKey) =>
        addToGUI(folder, value as NonNullable<T[keyof T]>, innerKey, [
          ...history,
          key as string,
        ])
      );
      return;
    }

    const controller = gui.add(parentValue, key);

    controller.onChange((newValue) => {
      if (history.length === 0) setState({ ...state, [key]: newValue });
      else if (history.length === 1) {
        const changedObject = { ...parentValue, [key]: newValue };
        setState({ ...state, [history[0]]: changedObject });
      } else {
        let changedObject: { [key: string]: any } = {
          ...parentValue,
          [key]: newValue,
        };
        let current: { [key: string]: any } = state;

        for (let i: number = history.length - 1; i >= 0; i--) {
          for (let j: number = 0; j < i; j++) current = current[history[j]];

          const changedObjectKey = history[i];
          changedObject = { ...current, [changedObjectKey]: changedObject };
        }
        setState({ ...state, [history[0]]: changedObject });
      }
    });
  }
}
