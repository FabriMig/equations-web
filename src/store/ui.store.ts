import { create } from 'zustand';

interface UiStore {
    currentCursorIndex: number
    showKeyboard: boolean

    addKeyboardStatus: (status: boolean) => void
    addCurrentCursorIndex: (newIndex: number) => void
}

const useUiStore = create<UiStore>(set => ({
    currentCursorIndex: 0,
    showKeyboard: false,

    addKeyboardStatus: (status) => set(() => ({showKeyboard: status})),
    addCurrentCursorIndex: (newIndex) => set(() => ({currentCursorIndex: newIndex}))
}))

export default useUiStore;