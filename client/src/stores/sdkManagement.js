import { observable, action, makeObservable } from "mobx";
import * as sdkManagement from '../api/sdkManagement'

class SDKManagementStore {

  @observable searchKey = '';
  @observable isLoading = false;
  @observable list = [];

  constructor(rootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  @action.bound
  async getSDKManagementList() {
    const list = await sdkManagement.getSDKManagementList();
    this.setList([...list, {
      clientName: `Total: ${list.length}`,
      isTotalLine: true
    }])
  }

  @action.bound
  async addSDKManagement(data) {
    await sdkManagement.addSDKManagement(data);
  }

  @action.bound
  setList(list) {
    this.list = list;
  }

  @action.bound
  setSearchKey(searchKey) {
    this.searchKey = searchKey;
  }

  @action.bound
  setIsLoading(loading) {
    this.isLoading = loading;
  }

}

export default SDKManagementStore;