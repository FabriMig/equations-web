import { StoredEquation } from '@/types';
import { create } from 'zustand';

type EquationFormats = {
    string: string,
    latex: string
}

interface EquationStore {
    currentEquation: EquationFormats
    copiedEquation: EquationFormats
    userEquations: StoredEquation[]
    currentEquationSolution: object[]
    lastTypedKey: { key: string, id: number }

    addLastTypedKey: (key: string) => void
    addCurrentEquation: (equation: EquationFormats) => void
    addCopiedEquation: (equation: EquationFormats) => void
    adduserEquations: (equation: StoredEquation[]) => void
    addCurrentEquationSolution: (equation: object[]) => void
}

const equationFormatsInitialState = {
    string: "",
    latex: ""
}

const useEquationStore = create<EquationStore>(set => ({
    currentEquation: equationFormatsInitialState,
    copiedEquation: equationFormatsInitialState,
    userEquations: [],
    currentEquationSolution: [],
    lastTypedKey: { key: "", id: 0 },

    addLastTypedKey: (key) => set((store) => ({ lastTypedKey: { key: key, id: store.lastTypedKey.id + 1}})),
    addCurrentEquation: (equation) => set(() => ({ currentEquation: { latex: equation.latex, string: equation.string } })),
    addCopiedEquation: (copiedEquation) => set(() => ({ copiedEquation: copiedEquation })),
    adduserEquations: (equations) => set(() => ({ userEquations: equations })),
    addCurrentEquationSolution: (equationSolution) => set(() => ({ currentEquationSolution: equationSolution })),
}))

export default useEquationStore;