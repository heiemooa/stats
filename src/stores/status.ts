import { makeAutoObservable } from "mobx";

class Status {
  siteState: "loading" | "wrong" | "normal" | "error" | "allError" = "loading";
  siteOverview: {
    count: number;
    okCount: number;
    downCount: number;
  } = {
    count: 0,
    okCount: 0,
    downCount: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  changeSiteState(val: "loading" | "wrong" | "normal" | "error" | "allError") {
    this.siteState = val;
  }
  changeSiteOverview(val: {
    count: number;
    okCount: number;
    downCount: number;
  }) {
    this.siteOverview = val;
  }
}

export default Status;
