import * as React from "react";

export interface ISelectableFieldProps {
  beingEdited: boolean;
  options: Array<string>
  content: string;
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurOrEnter: () => void;
  editingKey: string;
  elementKey: string;
  isAbstract?: boolean;
}

export interface ISelectableFieldState { }

const Editor = ({
  content,
  onChange,
  onBlurOrEnter,
  options
}: {
  content: string;
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurOrEnter: () => void;
  options: Array<string>;
}) => {
  return (
    <select name="values" id="values"
      value={content}
      onChange={onChange}
      onBlur={onBlurOrEnter}
    >
      {
        options.map((x, y) =>
          <option key={y}>{x}</option>)
      }
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
            options={this.props.options}
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
