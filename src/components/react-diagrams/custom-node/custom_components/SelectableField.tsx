import * as React from "react";

export interface ISelectableFieldProps {
  beingEdited: boolean;
  options: Array<string>
  content: { value: string };
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurOrEnter: () => void;
  editingKey: string;
  elementKey: string;
  isAbstract?: boolean;
}

export interface ISelectableFieldState { }

const Editor = ({
  value,
  onChange,
  onBlurOrEnter,
  options
}: {
  value: string;
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlurOrEnter: () => void;
  options: Array<string>;
}) => {
  return (

    <select name="values" id="values"
      value={value}
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
            value={this.props.content.value}
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
            {this.props.content.value}
          </p>
        )}
      </div>
    );
  }
}
