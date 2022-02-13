import React, {useRouter} from 'react';
import styled from 'styled-components';

const Cont = styled.div`
    display: flex;
`;
const BackBtnImg = styled.img`
    height: 18px;
    width: 18px;
`

const BackBtn = ({
    imgSrc="/back-dark.svg",
    onPressBackBtn = () =>{}
}) => {
    return <Cont onClick={onPressBackBtn}>
        <BackBtnImg src={imgSrc}></BackBtnImg>
    </Cont>
}

export default BackBtn;