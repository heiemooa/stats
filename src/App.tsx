import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { getSiteData } from "@/utils/getSiteData";
import { GlobalScrollbar } from "mac-scrollbar";
import useStores from "@/hooks/useStores";
import Header from "@/components/header";
import SiteStatus from "@/components/siteStatus";
import Footer from "@/components/footer";
import { ISite } from "./stores/cache";

const App = observer(() => {
  const { cache, status } = useStores();
  const [siteData, setSiteData] = useState<ISite[]>([]);

  // 加载配置
  const apiKey = import.meta.env.VITE_API_KEY;
  const countDays = import.meta.env.VITE_COUNT_DAYS;

  // 获取站点数据
  const getSiteStatusData = () => {
    setSiteData([]);
    getSiteData(apiKey, countDays, cache, status).then((res: any) => {
      setSiteData(res);
    });
  };

  useEffect(() => {
    getSiteStatusData();
  }, [apiKey, countDays]);

  return (
    <>
      <GlobalScrollbar />
      <Header getSiteData={getSiteStatusData} />
      <main>
        <div className="max-w-4xl m-auto -translate-y-4 bg-white rounded-lg shadow-xl">
          <SiteStatus siteData={siteData} days={countDays} />
        </div>
      </main>
      <Footer />
    </>
  );
});

export default App;
