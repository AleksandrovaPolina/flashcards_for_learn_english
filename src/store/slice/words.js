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
    async function (englishState, transcriptionState, russianState, {rejectWithValue}){
        try{
            const word = {
                english: englishState,
                transcription: transcriptionState,
                russian: russianState,
                tags: "",
                tags_json: "",
            }
            const response = await fetch('/api/words/add', {
                method: "POST",
                headers: {
                  "Content-type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify(word),
              })
              if (!response.ok) {
                throw new Error("Something went wrong")}
                const data = await response.json();
                console.log(data)
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
            console.log(response)
            
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
  reducers: {
    addWord(state, action) {
            state.words.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWords.pending, (state)=>{
        state.status = 'loading';
        state.error = null;
    })
    builder.addCase(getWords.fulfilled, (state, action)=>{
        state.status = 'resolved';
        state.words = action.payload;
    })
    builder.addCase(getWords.rejected, (state, action)=>setError(state, action));
    builder.addCase(addWordFetch.rejected, (state, action)=>setError(state, action));
    builder.addCase(deleteWord.rejected, (state, action)=>setError(state, action))
  }
});

const { addWord } = wordsSlice.actions;
export default wordsSlice.reducer;