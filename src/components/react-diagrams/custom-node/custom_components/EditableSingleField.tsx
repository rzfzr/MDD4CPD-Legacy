import * as React from "react";
import AutosizeInput from 'react-input-autosize';

export interface IEditableSingleFieldProps {
  beingEdited: boolean;
  content: string;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onBlurOrEnter: () => void;
  editingKey: string;
  elementKey: string;
  isAbstract?: boolean;
}
const Editor = ({
  content,
  onChange,
  onBlurOrEnter,
}: {
  content: string;
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
  }

  public render() {
    return (
      <div>
        {this.props.beingEdited &&
          this.props.editingKey === this.props.elementKey ? (
          <Editor
            content={this.props.content}
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
            {this.props.content}
          </p>
        )}
      </div>
    );
  }
}
