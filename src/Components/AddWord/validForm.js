export function isValidForm(englishState, transcriptionState, russianState) {
  if (englishState.trim() === "" || transcriptionState.trim() === "" || russianState.trim() === "") {
    return true;
  } else return false;
}
