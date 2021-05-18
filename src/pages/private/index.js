import { useStateMachine } from "little-state-machine";
import { useRouter } from "next/router";
import React from "react";

import { PrimaryButtton, Title1 } from "@/components/lib";
import PrivateLayout from "@/components/PrivateLayout";
import {
  formReducer,
  initEtsForm,
  reset,
} from "@/components/wizard/formReducer";
import { firstStepUrl } from "@/components/wizard/stepFlows";

function HospitalHomePage() {
  const router = useRouter();

  const { action } = useStateMachine(formReducer);

  function reinit() {
    reset({ action });
    initEtsForm({ action });

    router.push(firstStepUrl("ets"));
  }
  return (
    <PrivateLayout title="Déclaration des incidents de violence">
      <div className="w-8/12 p-8 py-4 mx-auto text-center border border-gray-300 rounded-lg shadow-md min-h-64">
        <Title1 className="mb-8 text-center">Formulaire</Title1>

        <p>Remplissez le questionnaire directement. </p>

        <p className="mb-8">Temps estimé : 4 minutes.</p>

        <PrimaryButtton onClick={reinit}>Déclarer</PrimaryButtton>
      </div>
    </PrivateLayout>
  );
}

export default HospitalHomePage;
