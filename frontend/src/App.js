import "./App.css";
import DataFetcher from "./component/DataFetcher";
import { Layout } from "antd";

const App = () => {
  return (
    <Layout>
      <DataFetcher title="User Information" />
    </Layout>
  );
};

export default App;
