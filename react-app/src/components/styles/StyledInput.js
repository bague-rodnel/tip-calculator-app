import styled from "styled-components";

export const StyledInput = styled.div`
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    left: 1rem;
    height: 100%;
    color: var(--c_cyan_gray_dark2);

    display: flex;
    align-items: center;
  }

  input {
    border: 1px solid #edf6f7;
    background-color: var(--c_cyan_gray_light2);
    padding-left: ${(props) => (props.Icon ? "3rem" : "1rem")};
    padding-right: 1rem;
    text-align: right;
    color: var(--c_cyan_very_dark);
    font-weight: var(--f_wt_bold);
    font-size: 24px;
  }
`;
