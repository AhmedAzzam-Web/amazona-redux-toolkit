import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

const steps = ["Login", "Shipping Address", "Payment Method", "Place Order"];

const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <Stepper
      activeStep={activeStep}
      sx={{ margin: { md: "1rem 5rem 2rem", xs: "2rem 0 3rem" } }}
    >
      {steps.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default React.memo(CheckoutWizard);
