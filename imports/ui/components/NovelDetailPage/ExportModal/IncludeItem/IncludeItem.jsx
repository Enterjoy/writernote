import React, { Component } from 'react';

export class IncludeItem extends Component {
  render() {
    const {
      _id,
      name,
      isCheck,
      changeCheck,
    } = this.props;

    return (
      <tr>
        <td>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={isCheck}
                onChange={changeCheck.bind(undefined, _id)}
              />
            </label>
          </div>
        </td>
        <td>
          <span>{name}</span>
        </td>
      </tr>
    );
  }
}
