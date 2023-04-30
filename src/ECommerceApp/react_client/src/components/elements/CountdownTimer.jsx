import { useEffect, useState } from "react"

export default function CountdownTimer(props) {
    const [expiryTime, setExpiryTime] = useState(props.expiryTime);
    const [countdownTime, setCountdownTime]= useState(
        {
            countdownDays:'',
            countdownHours:'',
            countdownMinutes:'',
            countdownSeconds:''
        }
    );

    const countdownTimer=()=>{
         const timeInterval= setInterval(() => {
           const countdownDateTime = new Date(expiryTime).getTime(); 
           const currentTime = new Date().getTime();
           const remainingDayTime = countdownDateTime - currentTime;
           const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
           const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
           const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
           const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);
      
           const runningCountdownTime={
              countdownDays: totalDays,
              countdownHours: totalHours,
              countdownMinutes: totalMinutes,
              countdownSeconds: totalSeconds
           }
        
           setCountdownTime(runningCountdownTime);
      
           if (remainingDayTime < 0) {
              clearInterval(timeInterval);
              setExpiryTime(false);
             }
      
          }, 1000);
     }
      
     useEffect(() => {
         countdownTimer();
     });

    return (
        <div className="flex gap-2 text-white ">
            <div className="py-2 rounded bg-purple-600 w-1/5 flex flex-col items-center justify-center">
                <p className="font-semibold">{countdownTime.countdownDays}</p>
                <p className="text-xs">Days</p>
            </div>
            <div className="py-2 rounded bg-purple-600 w-1/5 flex flex-col items-center justify-center">
                <p className="font-semibold">{countdownTime.countdownHours}</p>
                <p className="text-xs">Hour</p>
            </div>
            <div className="py-2 rounded bg-purple-600 w-1/5 flex flex-col items-center justify-center">
                <p className="font-semibold">{countdownTime.countdownMinutes}</p>
                <p className="text-xs">Min</p>
            </div>
            <div className="py-2 rounded bg-purple-600 w-1/5 flex flex-col items-center justify-center">
                <p className="font-semibold">{countdownTime.countdownSeconds}</p>
                <p className="text-xs">Sec</p>
            </div>
        </div>
    );
}