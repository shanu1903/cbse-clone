const API_URL = 'api'



export interface RequestSchema{
    rollNumber: string,
    schoolNumber: string,
    admitCardId: string,
    dob: number
}


export const postStudentData = async (requestBody :  RequestSchema )=>{
    try {
        return await fetch(`${API_URL}/students`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      } catch(err) {
        return {
          error: false,
        };
      }

}