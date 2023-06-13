import React, { useState } from "react";
import { useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { DateRange } from "react-date-range";
import { defaultStaticRanges } from "./defaultRanges";
import { format } from "date-fns";
import { pt } from 'date-fns/locale'
import { useContext } from "react";
import { ReservaContext } from "../../Contexts/ReservaContext";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "./Datepicker.css";

import PropTypes from "prop-types";

const DateRangeSelector = ({ ranges, onChange, onSubmit, direction, ...rest }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
     });
     const [show, setShow] = useState(false);
     const { dataIni, dataFim, setDataIni, setDataFim } = useContext(ReservaContext); 

     function formatDateDisplay(date, defaultText) {
          if (!date) return defaultText;
          return format(date, "yyyy-MM-dd");
     }

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
          console.log("Inicio: " + formatDateDisplay(ranges.selection.startDate));
          console.log("Fim: " + formatDateDisplay(ranges.selection.endDate));
          setDataIni(ranges.selection.startDate);
          setDataFim(ranges.selection.endDate);
     };

     // const onClickDone = () => {
     //      onSubmit(selectedDateRange);
     //      setShow(true);
     // };

     const onClickClear = () => {
          setSelectedDateRange({
               startDate: new Date(),
               endDate: new Date(),
               key: "selection"
          });
          setShow(false);
     };

     useEffect(() => {
          if(dataIni && dataFim){
               setSelectedDateRange({
                    startDate: dataIni,
                    endDate: dataFim,
                    key: "selection"
               });
          }

     }, []);

     return (
          <React.Fragment>
               <div className="shadow d-inline-block">
                    <DateRange
                         onChange={handleSelect}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={2}
                         ranges={[selectedDateRange]}
                         direction={direction}
                         showMonthAndYearPickers={false}
                         locale={pt}
                         minDate={new Date()}
                    />
               </div>

               {show&&<div className="h-100 mt-3 alert alert-transparent">
                    <p className="my-auto d-inline">Start Date :{" "}
                    {formatDateDisplay(selectedDateRange.startDate)}{" | "}
                    End Date :{" "}
                    {formatDateDisplay(selectedDateRange.endDate)}
                    </p>
                    <button className="mb-1 btn btn-transparent text-danger" onClick={() => setShow(false)} variant="outline-success"> Close</button>
               </div>}
          </React.Fragment>
     );
};

DateRangeSelector.defaultProps = {
     ranges: defaultStaticRanges
};

DateRangeSelector.propTypes = {
     /**
      * On Submit
      */
     onSubmit: PropTypes.func
};

export default DateRangeSelector;
