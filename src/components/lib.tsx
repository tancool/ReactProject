import styled from "@emotion/styled";
import { OmitProps } from "antd/lib/transfer/ListBody";

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBootom?: number
}>`
display: flex;
align-items: center;
justify-content: ${props => props.between ? 'space-between' : undefined};
margin-bottom:${props => props.marginBootom + 'rem'};
> *{
    margin-top: 0 !important;
    margin-top: 0 !important;
    margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
}
`
// > * 是直接指定子元素