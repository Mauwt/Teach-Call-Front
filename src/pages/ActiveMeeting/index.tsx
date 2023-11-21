import { BookingDataProps } from "../Dashboard/components/FutureClasses";
import { useState, useEffect  } from "react";

export function ActiveMeeting(bookingData: BookingDataProps){

    const [isActive, setIsActive] = useState(false);

    const [link, setLink] = useState("");

    // extract current date
    const currentDate = new Date();

    //arrow function use effect 
    useEffect(() => {

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
                    // "meetingDetails/teacher/{bookingData.id}"


                    //llamar api para meeting details  para teacher

                    setLink(bookingData.link);
                }
                else {
                    //llamar api para meeting details  para student
                    setLink(bookingData.link);
                
                }
            }
        },[]);

    



    return(
        <div>
            {isActive ? 
            <iframe src={{algooo}} allow="camera; microphone; fullscreen; speaker; display-capture; compute-pressure" style={{height: "700px", width: "100%"}}></iframe> 
            : <h1>Vuelve mas tarde</h1>}

            
        </div>
    );





}