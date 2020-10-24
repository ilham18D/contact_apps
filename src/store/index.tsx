import { rootReducer } from "./store";
export { store } from "./store";

export {
    contactAddMany,
    contactAdd,
    contacUpdate,
    contactSlice,
    contactDelete
} from "./content"

export type RootState = ReturnType<typeof rootReducer>;