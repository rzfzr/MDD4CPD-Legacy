import * as React from "react";
import AutosizeInput from 'react-input-autosize';

export interface IEditableSingleFieldProps {
  beingEdited: boolean;
  content: { value: string };
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onBlurOrEnter: () => void;
  editingKey: string;
  elementKey: string;
  isAbstract?: boolean;
}

export interface IEditableSingleFieldState { }
const Editor = ({
  value,
  onChange,
  onBlurOrEnter,
}: {
  value: string;
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
      value={value}
      onChange={onChange}
      onBlur={onBlurOrEnter}
      onKeyDown={(event: any) => {
        if (event.keyCode === 13) onBlurOrEnter();
      }}
    />
  );
};

export default class EditableSingleField extends React.Component<
  IEditableSingleFieldProps,
  IEditableSingleFieldState
> {
  constructor(props: IEditableSingleFieldProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        {this.props.beingEdited &&
          this.props.editingKey === this.props.elementKey ? (
          <Editor
            value={this.props.content.value}
            onChange={this.props.onChange}
            onBlurOrEnter={this.props.onBlurOrEnter}
          />
        ) : (
          <p
            style={{
              margin: 0,
              padding: 0,
              fontStyle: this.props.isAbstract ? "italic" : "normal"
            }}
          >
            {this.props.content.value}
          </p>
        )}
      </div>
    );
  }
}
