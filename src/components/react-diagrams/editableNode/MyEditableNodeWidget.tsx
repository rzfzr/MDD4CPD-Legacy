//@ts-nocheck
import * as React from "react";
// import EditableSingleField from "../custom-node/custom_components/EditableSingleField";
import { MyEditableNodeModel } from "./MyEditableNodeModel";
import "./MyEditableNodeWidgedStyle.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PortWidget, DiagramEngine, PortModelAlignment, DefaultPortLabel } from "@projectstorm/react-diagrams";
import styled from '@emotion/styled';


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

// interface ContextInformation {
//   context: string;
//   entity: string;
// }
// interface AtributeInformation {
//   atribute: string;
// }

export class MyEditableNodeWidget extends React.Component<
  MyEditableWidgetProps,
  MyEditableWidgetState
> {
  private divElement: HTMLDivElement;

  constructor(props: MyEditableWidgetProps) {
    super(props);
    this.state = {
      content: "",
      height: 0,
      width: 0,
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
    this.props.nodeModel.content = evt.currentTarget.value;
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
    const content = this.props.nodeModel.content;
    this.setState({ content });
  }

  /**
   * Change the width and height values of the element, to put the ports on right place
   */
  componentDidMount() {
    // const height = this.divElement.clientHeight;
    // const width = this.divElement.clientWidth;
    // this.setState({ height, width });
  }
  componentDidUpdate() {
    // const height = this.divElement.clientHeight;
    // const width = this.divElement.clientWidth;
    // if (this.state.height !== height || this.state.width !== width)
    //   this.setState({ height, width });
  }
  render() {
    return (
      <S.Node
        data-default-node-name={this.props.nodeModel.getOptions().name}
        selected={this.props.nodeModel.isSelected()}
        background={this.props.nodeModel.getOptions().color}>
        <S.Title>
          <S.TitleName>{this.props.nodeModel.getOptions().name}</S.TitleName>
        </S.Title>
        <S.Ports>
          <S.PortsContainer>{_.map(this.props.nodeModel.getInPorts(), this.generatePort)}</S.PortsContainer>
          <S.PortsContainer>{_.map(this.props.nodeModel.getOutPorts(), this.generatePort)}</S.PortsContainer>
        </S.Ports>
      </S.Node>
    );
  }
  // render() {
  //   return (
  //     <div
  //       ref={divElement => (this.divElement = divElement)}
  //       className={"editable-node"}
  //     >
  //       <div className="editable-border">
  //         <div className="editable-header">
  //           <div
  //             onDoubleClick={() => {
  //               this._editableObjectDoubleClick("content");
  //             }}
  //           >

  //             <EditableSingleField
  //               elementKey="content"
  //               editingKey={this.state.editingKey}
  //               beingEdited={this.state.editingSomething}
  //               content={this.props.nodeModel.content}
  //               onChange={this._contentOnChange}
  //               onBlurOrEnter={this._onBlurOrEnter}
  //             />
  //           </div>
  //         </div>

  //       </div>
  //       {/* <div
  //         style={{
  //           position: "absolute",
  //           zIndex: 10,
  //           background: "rgba(0,0,250,0.5)",
  //           left: -15, //old: -8
  //           top: this.state.height / 2 - 8
  //         }}
  //       >
  //         <PortWidget style={{ width: 15, height: 15 }} port={this.props.nodeModel.getPort(PortModelAlignment.LEFT)} engine={this.props.engine} />
  //       </div>
  //       <div
  //         style={{
  //           position: "absolute",
  //           zIndex: 10,
  //           background: "rgba(0,0,250,0.5)",
  //           left: this.state.width, //old: this.state.width - 8,
  //           top: this.state.height / 2 - 8
  //         }}
  //       >
  //         <PortWidget style={{ width: 15, height: 15 }} port={this.props.nodeModel.getPort(PortModelAlignment.RIGHT)} engine={this.props.engine} />
  //       </div> */}
  //     </div>
  //   );
  // }
}
