import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    box-shadow: 5px 5px 10px 1px grey;
    border-radius: 20px;
    height: 100%;
    word-break: break-all;

    button {
        padding: 10px;
        border-radius: 0 0 20px 20px;
    }

    img {
        max-height: 300px;
        object-fit: contain;
        border-radius: 20px 20px 0 0;
    }

    div {
        font-family: 'Montserrat', sans-serif;
        padding: 0 15px 20px;
        height: 100%;
        position: relative;
    }

    .price {
        position: absolute;
        height: 2%;
        bottom: 0;
    }
`;