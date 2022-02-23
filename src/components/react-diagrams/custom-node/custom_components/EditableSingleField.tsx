import * as React from "react";
import AutosizeInput from 'react-input-autosize';

export interface IEditableSingleFieldProps {
  node: any;
  beingEdited: boolean;
  content: string;
  onFocus: (evt: React.FormEvent<HTMLInputElement>) => void;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onBlurOrEnter: () => void;
  editingKey: string;
  elementKey: string;
  isAbstract?: boolean;
}
const Editor = ({
  content,
  onFocus,
  onChange,
  onBlurOrEnter,
}: {
  content: string;
  onFocus: (evt: React.FormEvent<HTMLInputElement>) => void;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onBlurOrEnter: () => void;
}) => {
  return (
    <AutosizeInput
      autoFocus
      inputStyle={{
        padding: 1,
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: "black"
      }}
      type="text"
      value={content}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlurOrEnter}
      onKeyDown={(event: any) => {
        if (event.keyCode === 13) onBlurOrEnter();
      }}
    />
  );
};

export default class EditableSingleField extends React.Component<
  IEditableSingleFieldProps
> {
  constructor(props: IEditableSingleFieldProps) {
    super(props);
    this.state = {};
    console.log('node', this.props.node)
  }

  public render() {
    return (
      <div>
        {this.props.beingEdited &&
          this.props.editingKey === this.props.elementKey ? (
          <Editor
            content={this.props.content}
            onFocus={() => this.props.node.setLocked(true)}
            onChange={this.props.onChange}
            onBlurOrEnter={() => {
              this.props.node.setLocked(false)
              this.props.onBlurOrEnter()
            }}
          />
        ) : (
          <p
            style={{
              margin: 0,
              padding: 0,
              fontStyle: this.props.isAbstract ? "italic" : "normal"
            }}
          >
            {this.props.content}
          </p>
        )}
      </div>
    );
  }
}
