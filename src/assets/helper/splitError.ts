export const  splitErrorMessage = (error: string, lang : "en" | "ar") => {

  const splitError = error.split('&&&');
  const errorMessage = lang === "en" ? splitError[0].trim() : splitError[1].trim();
  return errorMessage
  
}