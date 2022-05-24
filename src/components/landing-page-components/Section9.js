import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import SvgIconStyle from '../SvgIconStyle';
import { styled } from '@mui/material/styles';

const CustomizedAccordion = styled(Accordion)`
  &.Mui-expanded {
    background: #1081e80f;
    box-shadow: none;
    margin: 0;
  }
  &.MuiAccordion-root {
    border-left: solid 0.5rem #1081e8;
    border-bottom: none;
    border-top: none;
    border-radius: 0;
    margin: 1.5rem 0;
  }
  &.MuiAccordion-root:before {
    content: none;
  }
`;

function Section9() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="relative max-w-[48rem] mx-auto px-5 md:px-0  py-16 mb-20">
      <div className="text-center mb-9 px-5">
        <h6 className="text-primary text-xs mb-2">FAQS</h6>
        <h5 className="text-[#0F1642] mb-4">Frequently Asked Questions</h5>
        <p className="text-[#6E6B7B]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua . Libero id faucibus nisl tincidunt eget nullam non nisi est.
        </p>
      </div>
      <div>
        {[1, 2, 3, 4, 5].map((x) => (
          <CustomizedAccordion key={x} expanded={expanded === `panel${x}`} onChange={handleChange(`panel${x}`)}>
            <AccordionSummary
              className="!py-4"
              expandIcon={<SvgIconStyle src="/icons/DownIcon.svg" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h6 className="text-[#0F1642]">How do we create wealth</h6>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                dignissim quam.
              </Typography>
            </AccordionDetails>
          </CustomizedAccordion>
        ))}
      </div>
    </div>
  );
}

export default Section9;
