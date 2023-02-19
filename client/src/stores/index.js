import SDKManagementStore from "./sdkManagement";

class RootStore {
  constructor () {
    this.sdkManagementStore = new SDKManagementStore(this);
  }
}

export default RootStore;