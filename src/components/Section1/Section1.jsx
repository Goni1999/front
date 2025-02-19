import React, { useState } from "react";  // Importing useState
import ReportCaseModal1 from '../ReportCaseModal/ReportCaseModal1';  // Assuming this is the correct import for your modal
import './Section1.scss';  // Import your styles

const Section1 = () => {
  // Step 1: Create state to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

  return (
    <div className="wrap_wrap__S_v0r white helpers_section__H1_eK">
      <div className="box_box__5Jmfa box_lg__yYuAj regSteps_wrap__XqfSx grey">
        <div className="grid_grid__2D3md grid_gComponent__Xx_xR">
          <div className="grid_grid__2D3md helpers_textCenter__cyckU title_heading___4n5D grid_gXs__xir6K">
            <h2 className="heading_h2__kkLcC heading_noMargins__P5e_q">
              Ready to get your money back?
            </h2>
            <span>Submit your case to looking forward</span>
          </div>
          <div className="regSteps_steps__9JS8A">
            <div className="regSteps_shape__E4TxA">
              {/* Button that triggers the modal */}
              <button
                className="regSteps_icon__GNY6O js-analyticsClick js-analyticsVisible"
                onClick={toggleModal} // Trigger modal on button click
              >
                <img
                  alt="Create Account"
                  loading="lazy"
                  width="32"
                  height="32"
                  decoding="async"
                  data-nimg="1"
                  className="icon_icon__EUcfw"
                  src="https://static.capital.com/capital-v-c-20250129-1/_next/static/media/user-add.e780aade.svg"
                />
              </button>
              {/* Additional icons */}
              <i className="regSteps_icon__GNY6O">
                <img 
                  alt="Make Deposit" 
                  loading="lazy" 
                  width="32" 
                  height="32" 
                  decoding="async" 
                  data-nimg="1" 
                  className="icon_icon__EUcfw" 
                  src="https://static.capital.com/capital-v-c-20250129-1/_next/static/media/card-pos.71d77f70.svg" 
                />
              </i>
              <i className="regSteps_icon__GNY6O">
                <img 
                  alt="Start Trading" 
                  loading="lazy" 
                  width="32" 
                  height="32" 
                  decoding="async" 
                  data-nimg="1" 
                  className="icon_icon__EUcfw" 
                  src="https://static.capital.com/capital-v-c-20250129-1/_next/static/media/chart.a0328a86.svg" 
                />
              </i>
            </div>
            <b className="regSteps_text__WIIqF">1. Submit your case</b>
            <b className="regSteps_text__WIIqF">2. Wait for Confirmation</b>
            <b className="regSteps_text__WIIqF">3. Unlock your money</b>
          </div>
        </div>
      </div>

      {/* Step 3: Conditionally render the ReportCaseModal when the modal state is true */}
      {isModalOpen && <ReportCaseModal1 toggleModal={toggleModal} />}
    </div>
  );
};

export default Section1;
