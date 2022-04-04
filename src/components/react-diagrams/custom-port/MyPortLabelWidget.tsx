import * as React from 'react';
import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams-core';
import styled from '@emotion/styled';
import { MyPortModel } from '../myNode/MyPortModel';

export interface MyPortLabelProps {
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

    export const Port = styled.div((props: any) => ({
        border: 'solid 1px white',
        width: '14px',
        height: '14px',
        background: (props.hasLink ? 'rgba(255, 192, 0, 0.7)' : 'rgba(255, 255, 255, 0.3)'),
        '&:hover': {
            background: 'rgb(192, 255, 0)',
        }
    }))


    export const FakePort = styled.div`
        width: 16px;
		height: 16px;
	`;
}

export class MyPortLabel extends React.Component<MyPortLabelProps> {
    render() {
        const hasLink = Object.keys(this.props?.port?.links).length !== 0
        const hasHiddenLabel = this.props?.port?.getOptions().extras.hasHiddenLabel
        let isVoid = false
        if (this.props?.port?.getOptions().name?.startsWith('void')) {
            if (this.props?.port?.getOptions().alignment === "right") {
                isVoid = true
            }
        }
        const port = isVoid ? (<S.FakePort />) : (
            <PortWidget engine={this.props.engine
            } port={this.props.port} >
                <S.Port hasLink={hasLink} />
            </PortWidget>
        );

        const labelR = <S.LabelR>{this.props.port.getOptions().label}</S.LabelR>;
        const labelL = <S.LabelL>{this.props.port.getOptions().label}</S.LabelL>;

        return (
            <S.PortLabel>
                {this.props.port.getOptions().in ? port : !hasHiddenLabel && labelR}
                {this.props.port.getOptions().in ? !hasHiddenLabel && labelL : port}
            </S.PortLabel>
        );
    }
}