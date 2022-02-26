/* eslint-disable jsx-a11y/anchor-is-valid */
//@ts-nocheck
import * as React from "react";
import { MyEditableNodeModel } from "./MyEditableNodeModel";
import "./MyEditableNodeWidgedStyle.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DiagramEngine, DefaultPortLabel } from "@projectstorm/react-diagrams";
import styled from '@emotion/styled';

import EditableSingleField from "../custom-node/custom_components/EditableSingleField";
import SelectableField from "../custom-node/custom_components/SelectableField";

import ReactTooltip from 'react-tooltip';

import { Button } from '@material-ui/core';


namespace S {
  export const Node = styled.div<{ background: string; selected: boolean }>`
		background-color: ${(p) => p.background};
		border-radius: 5px;
		font-family: sans-serif;
		color: white;
		border: solid 2px black;
		overflow: visible;
		font-size: 11px;
		border: solid 2px ${(p) => (p.selected ? 'rgb(0,192,255)' : 'black')};
	`;

  export const Title = styled.div`
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		white-space: nowrap;
		justify-items: center;
	`;

  export const TitleName = styled.div`
		flex-grow: 1;
		padding: 5px 5px;
	`;

  export const Ports = styled.div`
		display: flex;
		background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
	`;

  export const PortsContainer = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;

		&:first-of-type {
			margin-right: 10px;
		}

		&:only-child {
			margin-right: 0px;
		}
	`;
}

export interface MyEditableWidgetProps {
  nodeModel: MyEditableNodeModel;
  engine: DiagramEngine
}

export interface MyEditableWidgetState {
  content: string;
  height: number;
  width: number;
  editingSomething: boolean;
  editingKey: string;
}
export class MyEditableNodeWidget extends React.Component<
  MyEditableWidgetProps,
  MyEditableWidgetState
> {
  private divElement: HTMLDivElement;

  constructor(props: MyEditableWidgetProps) {
    super(props);
    this.state = {
      content: { name: '', value: '' },
      variableType: '',
      editingSomething: false,
      editingKey: ""
    };

    //binding the methods to this element
    this._editableObjectDoubleClick = this._editableObjectDoubleClick.bind(this);
    this._contentOnChange = this._contentOnChange.bind(this);
    this._onBlurOrEnter = this._onBlurOrEnter.bind(this);
  }
  generatePort = (port) => {
    return <DefaultPortLabel engine={this.props.engine} port={port} key={port.getID()} />;
  };

  /**
   * Pass this on onDoubleClick.
   * You change the states to make the fields know it's in edit mode, and tell who is in the edit mode
   */
  _editableObjectDoubleClick = (content: string) => {
    if (this.state.editingSomething) return;
    this.setState({
      editingSomething: true,
      editingKey: content
    });
  };

  /**
   * What you'll do when the content is changed
   * Usually, you update the model and the state
   */
  _contentOnChange = (evt: React.FormEvent<HTMLInputElement>) => {

    this.props.nodeModel.content[this.state.editingKey] = evt.currentTarget.value;
    this.setState({ content: evt.currentTarget.value });
  };

  /**
   * What you will do when the InputField lost focus or you press enter
   * Usually, you change the states to make the fields know it's not in edit mode
   */
  _onBlurOrEnter = () => {
    this.setState({
      editingSomething: false,
      editingKey: ""
    });
  };

  /**
   * copy atributes from nodeModel
   */
  UNSAFE_componentWillMount() {
    this.setState({
      content: this.props.nodeModel.content
    });
  }
  render() {
    return (
      <S.Node
        data-default-node-name={this.props.nodeModel.getOptions().name}
        selected={this.props.nodeModel.isSelected()}
        background={this.props.nodeModel.getOptions().color}>
        <S.Title>
          {this.props.nodeModel.content.name && <div className={"editable-node"}
            ref={divElement => (this.divElement = divElement)}>
            <div className="editable-border">
              <div className="editable-header">
                <div
                  onDoubleClick={() => {
                    this._editableObjectDoubleClick("name");
                  }}
                >
                  <EditableSingleField
                    node={this.props.nodeModel}
                    elementKey="name"
                    editingKey={this.state.editingKey}
                    beingEdited={this.state.editingSomething}
                    content={this.props.nodeModel.content.name}
                    onChange={this._contentOnChange}
                    onBlurOrEnter={this._onBlurOrEnter}
                  />
                </div>
              </div>
            </div>
          </div>}
          <S.TitleName>
            <a data-tip data-for={'tip-' + this.props.nodeModel.getOptions().name} >
              {this.props.nodeModel.getOptions().name}:
            </a>
            <ReactTooltip
              className="interactableTooltip"
              id={'tip-' + this.props.nodeModel.getOptions().name}
              type='light'
              place="top"
              delayHide={500}
              effect="solid"
            >
              Usages:
              <Button> + </Button>
              <Button> - </Button>
            </ReactTooltip>
          </S.TitleName>
          <div className={"editable-node"}
            ref={divElement => (this.divElement = divElement)}>
            <div className="editable-border">
              <div className="editable-header">
                <div
                  onDoubleClick={() => {
                    this._editableObjectDoubleClick("value");
                  }}
                >
                  {(this.props.nodeModel.portsOut[0].options.name === 'bool' ||
                    this.props.nodeModel.portsOut[0].options.name === 'port' ||
                    this.props.nodeModel.getOptions().name === 'Condition'
                  ) ?
                    <SelectableField
                      elementKey="value"
                      options={this.props.nodeModel.selectableOptions}
                      editingKey={this.state.editingKey}
                      beingEdited={this.state.editingSomething}
                      content={this.props.nodeModel.content.value}
                      onChange={this._contentOnChange}
                      onBlurOrEnter={this._onBlurOrEnter}
                    />
                    :
                    <EditableSingleField
                      node={this.props.nodeModel}
                      elementKey="value"
                      editingKey={this.state.editingKey}
                      beingEdited={this.state.editingSomething}
                      content={this.props.nodeModel.content.value}
                      onChange={this._contentOnChange}
                      onBlurOrEnter={this._onBlurOrEnter}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </S.Title>
        <S.Ports>
          <S.PortsContainer>{_.map(this.props.nodeModel.getInPorts(), this.generatePort)}</S.PortsContainer>
          <S.PortsContainer>{_.map(this.props.nodeModel.getOutPorts(), this.generatePort)}</S.PortsContainer>
        </S.Ports>
      </S.Node>
    );
  }
}
