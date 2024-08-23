export const getLessonID = (): Array<number> => {
  const storedID = localStorage.getItem('LID');
  return storedID ? JSON.parse(storedID) : [];
};

export const setLessonID = (ID: Array<number>) => {
  let id = JSON.stringify(ID);
  localStorage.setItem('LID', id);
};

export const removeLessonID = () => {
  localStorage.removeItem('LID');
};

export const getExerciseID = (): Array<number> => {
  const storedID = localStorage.getItem('EID');
  return storedID ? JSON.parse(storedID) : [];
};

export const setExerciseID = (ID: Array<number>) => {
  let id = JSON.stringify(ID);
  localStorage.setItem('EID', id);
};

export const removeExerciseID = () => {
  localStorage.removeItem('EID');
};
