import PropTypes from "prop-types"
import React from "react"

import { OutlineButton, PrimaryButton } from "../lib"

function NavigationButtons({ goPrevious, onSubmit, isFinalStep, isFirstStep }) {
  return (
    <div className="flex justify-center w-full my-8 space-x-4">
      <OutlineButton type="button" onClick={goPrevious} tabIndex="0">
        {isFirstStep ? "Annuler" : "Retour"}
      </OutlineButton>
      <PrimaryButton onClick={onSubmit}>
        {isFinalStep ? "Envoyer la déclaration" : "Suivant"}
      </PrimaryButton>
    </div>
  )
}

NavigationButtons.propTypes = {
  goPrevious: PropTypes.func,
  isFinalStep: PropTypes.bool,
  isFirstStep: PropTypes.bool,
  onSubmit: PropTypes.func,
}

export default NavigationButtons
