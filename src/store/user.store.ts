import { create } from 'zustand';

interface UserStore {
    email: string,
    accountType: string

    addLogedUser: (email: string, accountType: string) => void
    logoutUser: () => void
}

const useUserStore = create<UserStore>(set => ({
    email: "",
    accountType: "",

    logoutUser: () => set(() => ({ email: "", accountType: "" })),
    addLogedUser: (email, accountType) => set(() => ({ email, accountType }))
}))

export default useUserStore;