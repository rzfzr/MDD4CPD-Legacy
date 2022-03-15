import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import { MyPortModel } from './MyPortModel';
import styled from '@emotion/styled';

export interface DefaultPortLabelProps {
    port: MyPortModel;
    engine: DiagramEngine;
}

namespace S {
    export const PortLabel = styled.div`
		display: flex;
		margin-top: 1px;
		align-items: center;
	`;

    export const LabelR = styled.div`
		padding: 0 4px 0 0;
		flex-grow: 1;
	`;

    export const LabelL = styled.div`
		padding: 0 0 0px 0;
		flex-grow: 1;
	`;

    export const Port = styled.div`
        border:solid 1px white;
		
        width: 14px;
		height: 14px;
		background: rgba(255, 255, 255, 0.3);
		&:hover {
			background: rgb(192, 255, 0);
		}
	`;
    export const FakePort = styled.div`
        width: 14px;
		height: 14px;
	`;
}

export class MyPortLabel extends React.Component<DefaultPortLabelProps> {
    render() {
        let isVoid = false
        if (this.props?.port?.getOptions().label?.startsWith('void')) {
            if (this.props?.port?.getOptions().alignment === "right") {
                isVoid = true
            }
        }
        const port = isVoid ? (<S.FakePort />) : (
            <PortWidget engine={this.props.engine
            } port={this.props.port} >
                <S.Port />
            </PortWidget>
        );
        const labelR = <S.LabelR>{this.props.port.getOptions().label}</S.LabelR>;
        const labelL = <S.LabelL>{this.props.port.getOptions().label}</S.LabelL>;

        return (
            <S.PortLabel>
                {this.props.port.getOptions().in ? port : labelR}
                {this.props.port.getOptions().in ? labelL : port}
            </S.PortLabel>
        );
    }
}