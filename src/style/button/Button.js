import styles from "styled-components";

const Button = styles.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "paleviolerted"};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioleted;
    border-radius: 3px;
`;

export { Button };
