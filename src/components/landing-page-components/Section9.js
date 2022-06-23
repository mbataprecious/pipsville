import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import SvgIconStyle from '../SvgIconStyle';
import { styled } from '@mui/material/styles';
import { FAQs } from './landingUtils';

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
    <div id="faqs" className="relative max-w-[48rem] mx-auto px-5 md:px-0  py-16 mb-20">
      <div className="text-center mb-9 px-5">
        <h6 className="text-primary text-xs mb-2">FAQS</h6>
        <h5 className="text-[#0F1642] mb-4">Frequently Asked Questions</h5>
        <p className="text-[#6E6B7B]">
          These are summarize list of questions and answers, all supposed to be commonly asked in some context.
        </p>
      </div>
      <div>
        {FAQs.map(({ title, answer }) => (
          <CustomizedAccordion
            key={title}
            expanded={expanded === `panel${title}`}
            onChange={handleChange(`panel${title}`)}
          >
            <AccordionSummary
              className="!py-4"
              expandIcon={<SvgIconStyle src="/icons/DownIcon.svg" />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <h6 className="text-[#0F1642]">{title}</h6>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{answer}</Typography>
            </AccordionDetails>
          </CustomizedAccordion>
        ))}
      </div>
    </div>
  );
}

export default Section9;
