import { google } from 'googleapis';
export async function to_google_sheets(
    user_API_key: string, 
    spreadsheet_id: string, 
    user: string, 
    task: string, 
    start_time: any, 
    stop_time: any
): Promise<void>{
    const sheets = google.sheets({version: 'v4', auth: user_API_key});

    const range = "Sheet1!A1:E1";

    const values=[[user, task, start_time, stop_time]];
    try{

    }catch (error){
        
    }


}