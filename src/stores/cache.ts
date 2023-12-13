import { makeAutoObservable } from "mobx";
import { makePersistable, isHydrated } from "mobx-persist-store";

interface IDaily {
  uptime: number;
  down: { times: number; duration: number };
  date: any;
}
export interface ISite {
  id: number;
  name: string;
  average: number;
  url: string;
  total: {
    times: number;
    duration: number;
  };
  status: "ok" | "down" | "unknown";
  daily: IDaily[];
}

interface ISiteData {
  data: ISite[];
  timestamp: number;
}

class Cache {
  // 站点数据
  siteData?: ISiteData | null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "siteDataCache",
      properties: ["siteData"],
      storage: window.localStorage,
      stringify: true, // 将数据转换为 JSON 字符串格式
    });
  }

  changeSiteData(val: ISiteData) {
    this.siteData = val;
  }

  removeSiteData() {
    this.siteData = null;
  }

  get isHydrated() {
    return isHydrated(this);
  }
}

export default Cache;
