export interface Question {
    questionText: string;
    responses: Response[];
   }
   
   export interface Response {
    responseText: string;
    isCorrect: boolean;
   }