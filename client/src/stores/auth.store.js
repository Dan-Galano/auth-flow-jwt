import { create } from "zustand";
import { user } from "./user.js";

export const useStore = create((...a) => ({
    ...user(...a),
}));