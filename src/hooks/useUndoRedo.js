// useUndoRedo.js
import { useState } from 'react';

function useUndoRedo(initialState) {
  const [state, setState] = useState({
    present: initialState,
    past: [],
    future: []
  });

  const set = (newState) => {
    setState(({ past, present }) => ({
      past: [...past, present],
      present: newState,
      future: []
    }));
  };

  const undo = () => {
    setState(({ past, present, future }) => {
      if (past.length === 0) return { past, present, future };
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, past.length - 1),
        present: previous,
        future: [present, ...future]
      };
    });
  };

  const redo = () => {
    setState(({ past, present, future }) => {
      if (future.length === 0) return { past, present, future };
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1)
      };
    });
  };

  return [state.present, set, undo, redo];
}

export default useUndoRedo;
