import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Person {
  id: number;
  name: string;
  age: string;
  mobile: string;
  sex: string;
  govtIdType: string;
  govtId: string;
  address?: string;
    state?: string;
    city?: string;
    pincode?: string;
    country: string;
}
interface data {
  name: string;
  age: string;
  mobile: string;
  sex: string;
  govtIdType: string;
  govtId: string;
  address?: string;
    state?: string;
    city?: string;
    pincode?: string;
    country: string;
}

interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [],
};
export const PersonSlice = createSlice({
    name: "person",
    initialState,
    reducers: {
      addPerson: (state, action: PayloadAction<data>) => {
        state.persons.push({
          id: state.persons.length +1 ,
          name: action.payload.name,
          age: action.payload.age,
          mobile: action.payload.mobile,
          sex: action.payload.sex,
          govtIdType: action.payload.govtIdType,
          govtId: action.payload.govtId,
          address: action.payload.address,
            state: action.payload.state,
            city: action.payload.city,
            pincode: action.payload.pincode,
            country: action.payload.country,
        });
      },
    },
});
export default PersonSlice.reducer;
export const { addPerson } = PersonSlice.actions;