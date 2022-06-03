import React from "react";
import { storiesOf } from "@storybook/react";
import Accordion from "./Accordion";
import { FaCaretDown } from "react-icons/fa";

const stories = storiesOf("junaui/Accordion", module);

stories
  .add("Basic Usage", () => {
    return (
      <>
        <Accordion>
          <Accordion.Summary
            aria-controls='panel1a-content'
            id='panel1a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 1
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Summary
            aria-controls='panel2a-content'
            id='panel2a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 2
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Summary
            aria-controls='panel3a-content'
            id='panel3a-header'
            expandIcon={<FaCaretDown />}
          >
            Summary
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
      </>
    );
  })
  .add("Disabled", () => {
    return (
      <>
        <Accordion disabled>
          <Accordion.Summary
            aria-controls='panel1a-content'
            id='panel1a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 1
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Summary
            aria-controls='panel2a-content'
            id='panel2a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 2
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
      </>
    );
  })
  .add("Remove Gutters", () => {
    return (
      <>
        <Accordion removeGutters>
          <Accordion.Summary
            aria-controls='panel1a-content'
            id='panel1a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 1
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
        <Accordion removeGutters>
          <Accordion.Summary
            aria-controls='panel2a-content'
            id='panel2a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 2
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
      </>
    );
  })
  .add("Expanded by Parent", () => {
    return (
      <>
        <Accordion expanded>
          <Accordion.Summary
            aria-controls='panel1a-content'
            id='panel1a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 1
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
        <Accordion expanded>
          <Accordion.Summary
            aria-controls='panel2a-content'
            id='panel2a-header'
            expandIcon={<FaCaretDown />}
          >
            Accordion 2
          </Accordion.Summary>
          <Accordion.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Accordion.Content>
        </Accordion>
      </>
    );
  });
