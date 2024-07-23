import { Complaint } from "../interfaces"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export async function createComplaint(token: string, complaint: Complaint): Promise<boolean> {

    try {

        const resp = await fetch(
            BACKEND_URL + "/complaint",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: complaint.email,
                    campus: complaint.campus,
                    mess: complaint.mess,
                    date_of_happening: complaint.date_of_happening,
                    student_name: complaint.student_name,
                    student_phno: complaint.student_phno,
                    college_name: complaint.college_name,
                    is_clean: JSON.parse(complaint.is_clean),
                    is_pest_controlled: JSON.parse(complaint.is_pest_controlled),
                    food_handler_protocols: JSON.parse(complaint.food_handler_protocols),
                    complaint_desc: complaint.complaint_desc,
                    suggestion_improvement: complaint.suggestion_improvement,
                    complaint_category: complaint.complaint_category,
                    meal_time: complaint.meal_time,
                    image_photos: [],
                }),
            }
        )

        if (resp.status !== 201) {
            return false
        }

        return true


    } catch (err: any) {
        console.log(err)
        return false
    }

}