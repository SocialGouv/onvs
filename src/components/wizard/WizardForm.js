import { useStateMachine } from "little-state-machine";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

import {
  getComponentForStep,
  getFlow,
  getFlowWithCriteria,
} from "@/components/wizard/stepFlows";
import { DeclarationPageContext } from "@/hooks/useDeclarationContext";

import { ClientOnly } from "../ClientOnly";
import { Step0 } from "./flows/liberal";
import { formReducer } from "./formReducer";

/**
 *
 *
 *
 * @param {number} step number of the step (0 is taken by the generic Step0 not included in the flows)
 * @param {number} jobOrType first criteria to allow to have a specific flow (ex: ets)
 * @param {number} jobPrecision (optional) first criteria to allow to have a specific flow (ex: industrie, with jobOrType = pharmacien)
 * @returns
 */
export function WizardForm({ step, jobOrType, jobPrecision }) {
  const router = useRouter();
  const { action, state } = useStateMachine(formReducer);

  // declarationType is present after the INIT action.
  const { declarationType } = state;

  // the flow to use, based on the precedent declarationType or by the jobOrType/jobPrecision for the first time.
  const flow =
    getFlow(declarationType) ||
    getFlowWithCriteria({ jobOrType, jobPrecision });

  // the step component to render.
  const DynamicComponent =
    step === 0 ? Step0 : getComponentForStep({ declarationType, step });

  // Initialize the declaration type and route to the next step.
  function onInit(data) {
    const { job, jobPrecision } = data;

    const normalizeFromSelect = (select) => select?.label;

    const declarationType = getFlowWithCriteria({
      job: normalizeFromSelect(job),
      jobPrecision: normalizeFromSelect(jobPrecision),
    }).declarationType;

    const url = `/declaration/etape/1/${declarationType}`;

    const payload = {
      data,
      declarationType,
      event: { name: "INIT" },
      step,
      stepName: "job", // the conventionnal name of the step 0 is job.
    };
    action(payload);

    router.push(url);
  }

  // Submit the step's flow, give a name to store data in the session storage state and route to the next step.
  function onSubmit(data) {
    const payload = {
      data,
      event: { name: "SUBMIT" },
      step,
      stepName: flow?.steps?.[step - 1]?.name, // name of the field in the state to store this step's user data
    };
    action(payload);
    const url = `/declaration/etape/${step + 1}/${state?.declarationType}`;

    router.push(url);
  }

  // Go to the previous step.
  function goPrevious() {
    if (step <= 1) {
      const isConfirmed = confirm(
        "Vous allez quitter le formulaire et les données déjà renseignées seront perdues. Merci de confirmer."
      );
      if (isConfirmed) {
        reset();
      }
      return;
    }
    const url = `/declaration/etape/${Math.max(0, step - 1)}/${
      state?.declarationType
    }`;

    router.push(url);
  }

  function reset() {
    action({ event: { name: "RESET" } });
    router.push(`/`);
  }

  return (
    <>
      <DeclarationPageContext.Provider
        value={{
          goPrevious,
          onInit,
          onSubmit,
          orderedSteps: flow.steps,
          state,
          step,
        }}
      >
        <ClientOnly>
          <DynamicComponent key={step} />
        </ClientOnly>
      </DeclarationPageContext.Provider>
    </>
  );
}

WizardForm.propTypes = {
  jobOrType: PropTypes.string,
  jobPrecision: PropTypes.string,
  step: PropTypes.number.isRequired,
};
