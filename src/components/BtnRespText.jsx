import React from 'react';
import PropTypes from 'prop-types';

function BtnRespText({ answer, indexResp, index }) {
  function decodeEntity(inputStr) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  return (
    (indexResp === index)
      ? (
        <div
          className="has-tooltip-arrow has-tooltip-arrow
           has-tooltip-active has-tooltip-bottom"
          data-tooltip="Resposta dada!"
        >
          { decodeEntity(answer) }
        </div>
      ) : (
        <div>
          { decodeEntity(answer) }
        </div>

      )
  );
}

BtnRespText.propTypes = {
  answer: PropTypes.string.isRequired,
  indexResp: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default BtnRespText;
