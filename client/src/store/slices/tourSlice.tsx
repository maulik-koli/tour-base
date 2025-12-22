import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DurationOptionsType, SortOptionsType } from "@/constants/select-options";

export type FilterType = {
    sortBy: SortOptionsType; // for now just string then will add enum
    search: string;
    duration: DurationOptionsType; // also might add enum later
    maxPrice: number;
}

interface TourState {
    filter: FilterType;
    globalSearch: string
}

const initialState: TourState = {
    filter: {
        duration: "15+",
        maxPrice: 50000,
        search: "",
        sortBy: "name_asc",
    },
    globalSearch: ""
}


const tourSlice = createSlice({
    initialState,
    name: "tour",
    reducers: {
        setOnGlobalSearch(state, action: PayloadAction<string>) {
            state.globalSearch = action.payload;
        },
        setFilter(state, action: PayloadAction<Partial<FilterType>>) {
            state.filter = {
                ...state.filter,
                ...action.payload
            }
        }
    }
})

export const { setOnGlobalSearch, setFilter } = tourSlice.actions;
export default tourSlice.reducer;