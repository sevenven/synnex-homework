import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { IconSDK } from './svgr'
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("User Profile", "/userprofile", <AppstoreOutlined />),
  getItem("SDK Management", "/sdkmanagement", <IconSDK />),
  getItem("Dashboards", "/dashboards", <SettingOutlined />),
  getItem("Terms & Conditions", "/conditions", <MailOutlined />)
]

export default items;