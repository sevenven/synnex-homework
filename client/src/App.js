import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { items, Routes } from "./router";
import { useEffect } from "react";

const { Sider } = Layout;

function App() {
  const location = useLocation();
  const navigator = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigator('./sdkmanagement')
  }, [location.pathname, navigator]);

  const handleMenuClick = (e) => {
    navigator(e.key);
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={230} theme="light">
          <Menu
            items={items}
            defaultSelectedKeys={[`${location.pathname}`]}
            selectedKeys={[`${location.pathname}`]}
            mode="inline"
            style={{ width: 230 }}
            onClick={(e) => handleMenuClick(e)}
          />
        </Sider>
        <Layout className="site-layout">
          <Routes />
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
