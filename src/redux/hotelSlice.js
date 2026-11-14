import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
    name: "hotels",

    initialState: {
        hotelList: [],
    },

    reducers: {
        setHotels: (state, action) => {
            state.hotelList = action.payload;
        },

        addHotel: (state, action) => {
            state.hotelList.push(action.payload);
        },

        updateHotel: (state, action) => {
            const index = state.hotelList.findIndex(
                (hotel) => hotel.id === action.payload.id
            );

            if (index !== -1) {
                state.hotelList[index] = action.payload;
            }
        },
        deleteHotel: (state, action) => {
            state.hotelList = state.hotelList.filter(
                (hotel) => hotel.id !== action.payload
            );
        },
    },
});

export const {
    setHotels,
    addHotel,
    updateHotel,
    deleteHotel,
} = hotelSlice.actions;

export default hotelSlice.reducer;