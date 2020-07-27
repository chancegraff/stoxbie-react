import React from "react";
import moment from "moment";
import { StatefulDatePicker } from "baseui/dist/datepicker";
import { FormControl } from "baseui/dist/form-control";
import { Block } from "baseui/dist/block";

type Props = unknown;

const oneYear = moment().subtract(1, "year").toDate();

const RewindCalendar: React.FC<Props> = () => {
  return (
    <FormControl label="Pick Start Date">
      <StatefulDatePicker maxDate={oneYear} />
    </FormControl>
  );
};

export default RewindCalendar;
