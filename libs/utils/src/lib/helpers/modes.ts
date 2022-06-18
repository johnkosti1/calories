import { Modes } from '../types';

export const isViewMode = (mode: Modes) => mode === Modes.View
export const isUpdateMode = (mode: Modes) => mode === Modes.Update
export const isCreateMode = (mode: Modes) => mode === Modes.Create
