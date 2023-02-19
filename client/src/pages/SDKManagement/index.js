import React, { PureComponent } from "react";
import { observer, inject } from 'mobx-react';
import { Space } from 'antd';
import Header from './Header';
import VirtualTable from '../../components/VirtualTable/index';
import Loading from '../../components/Loading';
import { createNamespace, highlightText } from '../../util';
import { IconDelete, IconEdit } from './svgr';

import './index.scss';

const [prefixCls] = createNamespace('sdk-management', 'page');

const columns = [
  {
    width: 250,
    title: 'Client name',
    dataIndex: 'clientName',
    key: 'clientName',
    render: (_, item) => {
      return <div dangerouslySetInnerHTML={{ __html: highlightText(item.clientName, item.searchKey) }} />
    },
  },
  {
    width: 200,
    title: 'Board name',
    dataIndex: 'boardName',
    key: 'boardName',
    render: (_, item) => {
      if (item.isTotalLine) return;
      return <div dangerouslySetInnerHTML={{ __html: highlightText(item.boardName, item.searchKey) }} />
    },
  },
  {
    width: 300,
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (_, item) => {
      if (item.isTotalLine) return;
      return (
        <Space size={[0, 8]} wrap>
          {
            item.tags?.slice(0, 2).map(subItem => {
              return <div key={subItem} className="cell-tag" dangerouslySetInnerHTML={{ __html: highlightText(subItem, item.searchKey) }}></div>
            })
          }
          {item.tags.length > 2 && <div className="cell-tag">+{item.tags.length - 2}</div>}
        </Space>
      )
    },
  },
  {
    title: 'Requestor',
    dataIndex: 'requestor',
    key: 'requestor',
    render: (_, item) => {
      return <div dangerouslySetInnerHTML={{ __html: highlightText(item.requestor, item.searchKey) }} />
    }
  },
  {
    title: 'SDK script',
    dataIndex: 'script',
    key: 'script',
    render: (_, item) => {
      if (item.isTotalLine) return;
      return (
        <span className="sdk-link">&lt;&#47;&gt;&ensp;SDK</span>
      )
    }
  },
  {
    width: 120,
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, item) => {
      if (item.isTotalLine) return;
      return (
        <Space size="small">
          <IconEdit className="action-icon" />
          <IconDelete className="action-icon" />
        </Space>
      )
    }
  },
];

@inject('sdkManagementStore')
@observer
class SDKManagement extends PureComponent {

  componentDidMount() {
    const { getSDKManagementList } = this.props.sdkManagementStore;
    getSDKManagementList()
  }

  isIncludeSearchKey = (item = "") => {
    const { searchKey } = this.props.sdkManagementStore;
    return item.indexOf(searchKey) >= 0
  }

  getFilterList = () => {
    const { searchKey, list } = this.props.sdkManagementStore;
    return list.filter((item) => {
      item.searchKey = searchKey;
      return this.isIncludeSearchKey(item.clientName) || this.isIncludeSearchKey(item.boardName) || this.isIncludeSearchKey(item.tags ? item.tags.slice(0, 2).join("@$_") : '') || this.isIncludeSearchKey(item.requestor)
    })
  }

  render() {
    const filterList = this.getFilterList();
    const { isLoading } = this.props.sdkManagementStore;

    return (
      <div className={prefixCls} >
        <Header />
        <VirtualTable
          columns={columns}
          dataSource={filterList}
          scroll={{ y: document.documentElement.clientHeight - 127 }}
        />
        {isLoading && <Loading />}
      </div >
    );
  }

}

export default SDKManagement;
