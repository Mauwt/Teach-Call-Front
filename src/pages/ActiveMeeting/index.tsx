import { BookingDataProps } from "../Dashboard/components/FutureClasses";
import { useState, useEffect  } from "react";
import api from "../../api/configs/axiosConfig";

export default function ActiveMeeting(bookingData: BookingDataProps){
    console.log(bookingData);

    const [isActive, setIsActive] = useState(false);

    const [link, setLink] = useState("");

    // extract current date
    const currentDate = new Date();

    
    //arrow function use effect 
    useEffect(() => {
        const apicall = async () => {

            // extract current date
            const currentDate = new Date();

            // extract booking date
            const bookingDate = new Date(bookingData.date);

            //compare dates
            const compareDates = currentDate.getTime() - bookingDate.getTime();

            // if the difference is more than  0 minutes - not active
            if(compareDates > 0){
                setIsActive(false);
            }else{
                setIsActive(true);
                // get role
                const role = localStorage.getItem("role");
                if (role == "teacher"){
                    const response = await api.get(`meetingDetails/teacher/${bookingData.id}`)
                    const link = response.data;
                    setLink(link);
                }
                else if (role == "student"){    
                    const response = await api.get(`meetingDetails/student/${bookingData.id}`)
                    const link = response.data;
                    setLink(link);
                }
            }

        }
        apicall();
        },[]);

    



    return(
        <div>
            {isActive ? 
            <iframe src={link} allow="camera; microphone; fullscreen; speaker; display-capture; compute-pressure" style={{height: "700px", width: "100%"}}></iframe> 
            : <h1>Vuelve mas tarde</h1>}
        </div>
    );





}