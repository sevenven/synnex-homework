import React, { PureComponent } from "react";
import { observer, inject } from 'mobx-react';
import { Input } from 'antd';
import AddSDK from "../AddSDK";
import { IconSearch } from '../svgr';

@inject('sdkManagementStore')
@observer
class Header extends PureComponent {

  state = {
    value: ''
  }

  // handle enter press
  handlePressEnter = (e) => {
    const { value } = this.state
    const { setSearchKey } = this.props.sdkManagementStore;
    setSearchKey(value);
  }

  // handle input change
  handleInptChange = (e) => {
    this.setState({
      value: e.target.value
    }, () => {
      const { value } = this.state;
      const { setSearchKey } = this.props.sdkManagementStore;
      if (this.state.value === '') setSearchKey(value);
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <div className="header-title">SDK Management</div>
        <div className="header-right">
          <Input value={value} onChange={this.handleInptChange} placeholder="Search client name,board name,tags,requestor" prefix={<IconSearch className="icon-search" />} onPressEnter={this.handlePressEnter} />
          <AddSDK />
        </div>
      </div>
    );
  }
}

export default Header;

