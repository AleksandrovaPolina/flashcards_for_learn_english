

export function isValidEmptyRow(meaningState, transcriptionState, translationState){
    if(meaningState.trim() === '' || transcriptionState.trim() === '' || translationState.trim() === ''){
       return true;
    }
       else return false;
}