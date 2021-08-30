import React from "react";
import { FrmX, FldX, ArrX, BtnX, RstX, useFldXObserver } from "frmx"
import { isEmail, isHexColor } from "validator"
import parsePhoneNumber from 'libphonenumber-js'

import {
  Box,
  Button,
  Checkbox,
  Slider,
  TextField,
  Typography
} from "@material-ui/core";
import useStyles from "./styles.js";
import PhoneInput from "./components/PhoneInput.js";

const fields = {
  name: "",
  email: "",
  phoneNumber: "",
  date: "2021-07-11",
  options: {
    arr: [""],
    obj: { 0: "" },
    colors: {
      main: "#ffbb00"
    },
    slider: 10,
    checked: true
  },
  newPassword: "",
  confirmedPassword: "",
  objInArr: []
};

const isTrue = (val) => val;

const validationMethods = {
  name: (val, form) => {
    // implement some way to register observers inside validation?
    // now only reruns after some changes have been made to the field
    // ONLY BUBBLES UP RELATIONAL ERRORS UPON INVALID SUBMIT OR FIELD CHANGE
    return form['options.checked']
  },
  email: (val) => isEmail(val),
  // email: isEmail,
  phoneNumber: val => {
    const n = parsePhoneNumber(val)
    if (n && !n?.isValid()) return false
    else return true
  },
  options: {
    checked: isTrue,
    colors: {
      main: isHexColor
    }
  },
  objInArr: {
    name: s => s.length > 3
  }
}

export default function Demo() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <FrmX
        renderDiv
        // afterChange={console.log}
        className={classes.formContainer}
        // updatesOnly
        initialValues={fields}
        onSubmit={(values) => console.log(values)}
        onReset={(values) => console.log("reset")}
        // disabled
        // clearAfterSubmit
        disableSubmitIfInvalid
        // disabledIf={(formData) => formData.name === formData.newPassword}
        disableIfNoUpdates
        onInvalidSubmit={() => alert("Invalid form!")}
        schemaValidation={validationMethods}
        diff='keys'
      >
        <Typography variant="h4" className={classes.input}>
          Some Meaningful Form
        </Typography>

        <FldX field="date" type="date">
          <TextField
            className={classes.input}
            variant="outlined"
            label="Date"
          />
        </FldX>

        <FldX field="options.slider" type="range" getValueFromArgs={args => args[1]}>
          <Slider valueLabelDisplay="auto" />
        </FldX>

        <FldX field="name" type="text" afterChange={console.log} isErrorProp="error">
          <TextField
            className={classes.input}
            variant="outlined"
            label="Name"
          />
        </FldX>

        <PhoneInput
          field="phoneNumber"
          className={classes.input}
          placeholder="Enter your number"
        />

        <FldX field="email" isErrorProp="error" trim>
          <TextField
            className={classes.input}
            variant="outlined"
            label="me@email.com"
          />
        </FldX>

        <FldX field="options.obj.0">
          <TextField
            className={classes.input}
            variant="outlined"
            label="Field Object"
          />
        </FldX>

        <FldX field="options.arr.0">
          <TextField
            className={classes.input}
            variant="outlined"
            label="Field Array"
          />
        </FldX>

        <SomeComponent field="options.colors.main" />

        <Box className={classes.checkboxContainer}>
          <FldX field="options.checked" type="checkbox">
            <Checkbox className={classes.checkbox} />
          </FldX>
        </Box>

        <ArrayStuff field="objInArr" />

        <FrmX
          initialValues={{ name: "I'm a nested form" }}
          onSubmit={formData => console.log("Nested Form Submit")}
          renderDiv
        >
          <FldX field="name" type="text">
            <TextField
              className={classes.input}
              variant="outlined"
              label="Name"
            />
          </FldX>

          <BtnX>
            <Button variant="contained" className={classes.input}>
              Submit Nested Form
            </Button>
          </BtnX>

        </FrmX>

        <BtnX>
          <Button variant="contained" className={classes.input}>
            Submit
          </Button>
        </BtnX>

        <RstX >
          <Button variant="contained" className={classes.input}>
            Reset
          </Button>
        </RstX>
      </FrmX>
    </Box>
  );
}

function SomeComponent({ field }) {
  const classes = useStyles();

  useFldXObserver("options.slider", f => console.log("observer1", f))

  return <FldX field={field} type="color">
    <input className={classes.input} />
  </FldX>
}

function ArrayStuff({ field }) {
  const classes = useStyles();

  const fieldVal = useFldXObserver("options.slider")
  console.log("observer2", fieldVal)

  return <ArrX field={field} model={{ name: "", email: "" }}>
    {({ field, items, addItem, removeItem, disabled }) => (
      <Box>
        {items.map((item, i) => (
          <Box key={`unique-id-${i}`}>
            <FldX field={`${field}.${i}.name`} isErrorProp="error">
              <TextField
                className={classes.input}
                variant="outlined"
                label="Name"
              />
            </FldX>
            <FldX field={`${field}.${i}.email`}>
              <TextField
                className={classes.input}
                variant="outlined"
                label="Email"
              />
            </FldX>

            <Button disabled={disabled} onClick={() => removeItem(i)}>Remove</Button>
          </Box>
        ))}
        <Button disabled={disabled} onClick={addItem}>Add Person</Button>
      </Box>
    )}
  </ArrX>
}
