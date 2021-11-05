import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'Montserrat', sans-serif;
    border-bottom: 1px solid brown;
    padding: 20px 0;

    div {
        flex: 1;
    }

    .information,
    .buttons {
        display: flex;
        justify-content: space-around;
    }

    img {
        max-width: 130px;
        object-fit: contain;
        margin-left: 40px;
    }

`;