import { React, useEffect, useState } from "react";
import { DateHeader, DateTBody, DateTHead } from "..";

import './calendar.css';

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [previousMonthDays, setPreviousMonthDays] = useState([]);
    const [currentMonthDays, setCurrentMonthDays] = useState([]);
    const [nextMonthDays, setNextMonthDays] = useState([]);

    const previousMonth = (e) => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    }
    
    const nextMonth = (e) => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    }

    const getDaysInMonth = (date) => {
        const firstDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
        const firstDayCurrentMonth = new Date(date.getFullYear(), date.getMonth());
        const diff = firstDayNextMonth - firstDayCurrentMonth;
        return diff / (1000 * 60*60*24);
    }

    useEffect(()=>{

        let indexLastDayInPrev = new Date(new Date(currentDate).setDate(0)).getDay();
        const prev = (indexLastDayInPrev !== 0)?([...Array(getDaysInMonth(new Date(new Date(currentDate).setMonth(currentDate.getMonth() - 1)))).keys()].slice(-indexLastDayInPrev)):([]);
        const current = [...Array(getDaysInMonth(new Date(currentDate))).keys()];
        const next = [...Array(getDaysInMonth(new Date(new Date(currentDate).setMonth(currentDate.getMonth() + 1)))).keys()].slice(0, 42-(prev.length+current.length))

        setPreviousMonthDays(prev);
        setCurrentMonthDays(current);
        setNextMonthDays(next);
    }, [currentDate])


    return(
        <div className="calendar">
            <DateHeader date={currentDate} previousMonth={previousMonth} nextMonth={nextMonth} />
            <DateTHead/>
            <DateTBody previousDays={previousMonthDays} currentDays={currentMonthDays} nextDays={nextMonthDays} />
        </div>
    )
}

export default Calendar;