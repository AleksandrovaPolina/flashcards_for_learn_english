import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getWords = createAsyncThunk(
    'words/getWords',
    async function(_, {rejectWithValue}){
        try{
            const response = await fetch('http://itgirlschool.justmakeit.ru/api/words');
        if (!response.ok) {
            throw new Error("Something went wrong");
          }
        const data = await response.json();
        return data;
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const addWordFetch = createAsyncThunk(
    'words/addWordFetch',
    async function (stateAddWord, {rejectWithValue}){
        try{
            const word = {
                english: stateAddWord.englishState,
                transcription: stateAddWord.transcriptionState,
                russian: stateAddWord.russianState,
                tags: "",
                tags_json: "",
            }
            const response = await fetch(`/api/words/add`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(word),
              })
              if (!response.ok) {
                throw new Error("Something went wrong")}
                const data = await response.json();
                return data;
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const deleteWord = createAsyncThunk(
    'words/deleteWords',
    async function (id, {rejectWithValue}){
        try{
            const response = await fetch(`api/words/${id}/delete`, {method: "POST"})
            if(!response.ok){
                throw new Error("Something went wrong");
            }
            return id;
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const saveEditWord = createAsyncThunk(
    'words/saveEditWord',
    async function (obj, {rejectWithValue}){
        try{
            const {id, english, transcription, russian} = obj;
            const editWord = {
                english: english,
                transcription: transcription,
                russian: russian,
                tags: "",
                tags_json: "",
            }
            const response = await fetch(`/api/words/${id}/update`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(editWord),
                })
                if(!response.ok){
                    throw new Error("Something went wrong");
                }
                return obj;
        }
        catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) =>{
    state.status = 'rejected';
    state.error = action.payload;
}

const wordsSlice = createSlice({
  name: "words",
  initialState: {
    words: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getWords.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(getWords.fulfilled, (state, action)=>{
            state.words = action.payload;
            state.status = 'resolved';
        })
        .addCase(getWords.rejected, (state, action)=>setError(state, action))

        .addCase(addWordFetch.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(addWordFetch.fulfilled, (state, action)=>{
            state.words = [...state.words, action.payload];
            state.status = 'resolved';
        })
        .addCase(addWordFetch.rejected, (state, action)=>setError(state, action))

        .addCase(saveEditWord.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(saveEditWord.fulfilled, (state, action)=>{
            const updatedObj = state.words.findIndex((item)=>item.id === action.payload.id);
            state.words[updatedObj] = action.payload;
            state.status = 'resolved';
        })
        .addCase(saveEditWord.rejected, (state, action)=>setError(state, action))
        
        .addCase(deleteWord.pending, (state)=>{
            state.status = 'loading';
            state.error = null;
        })
        .addCase(deleteWord.fulfilled, (state,action)=>{
            state.words = state.words.filter((item) => item.id !== action.payload)
            state.status = 'resolved';
        })
        .addCase(deleteWord.rejected, (state, action)=>setError(state, action))
  }
});


export default wordsSlice.reducer;