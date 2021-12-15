import * as React from "react";
import AutosizeInput from 'react-input-autosize';

export interface ISelectableFieldProps {
  beingEdited: boolean;
  content: string;
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurOrEnter: () => void;
  editingKey: string;
  elementKey: string;
  isAbstract?: boolean;
}

export interface ISelectableFieldState { }

// interface EditorInterface {
//   content: string;
//   onChange: () => any;
// }
const Editor = ({
  content,
  onChange,
  onBlurOrEnter,
}: {
  content: string;
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurOrEnter: () => void;
}) => {
  return (

    <select name="values" id="values"
      value={content}
      onChange={onChange}
      onBlur={onBlurOrEnter}
    >
      <option value="true">true</option>
      <option value="false">false</option>
    </select>

  );
};

export default class SelectableField extends React.Component<
  ISelectableFieldProps,
  ISelectableFieldState
> {
  constructor(props: ISelectableFieldProps) {
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
