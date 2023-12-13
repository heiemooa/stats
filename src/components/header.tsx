import { useState } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { formatTimestamp } from "@/utils/timeTools";
import { message } from "antd";
import CountUp from "react-countup";
import useStores from "@/hooks/useStores";
import CustomLink from "@/components/customLink";
import { GithubOne, Home, Mail, Refresh, Star } from "@icon-park/react";

const Header = observer(({ getSiteData }: { getSiteData: Function }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { status, cache } = useStores();
  const [lastClickTime, setLastClickTime] = useState(0);

  // 加载配置
  const siteName = import.meta.env.VITE_SITE_NAME;
  const githubName = import.meta.env.VITE_GITHUB_NAME;
  const homeUrl = import.meta.env.VITE_HOME_URL;
  const emailUrl = import.meta.env.VITE_EMAIL_URL;
  const blogUrl = import.meta.env.VITE_BLOG_URL;

  // 状态文本
  const statusNames = {
    loading: "站点状态加载中",
    error: "部分站点出现异常",
    allError: "全部站点出现异常",
    normal: "所有站点运行正常",
    wrong: "数据请求失败",
  };

  const statusColor = {
    loading: "bg-gradient-to-r from-sky-400 to-sky-500",
    error: "bg-gradient-to-r from-rose-400 to-red-500",
    allError: "bg-gradient-to-r from-red-400 to-red-700",
    normal: "bg-gradient-to-r from-green-400 to-green-600",
    wrong: "bg-gradient-to-r from-rose-400 to-red-500",
  };

  // 刷新状态
  const refreshStatus = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 60000) {
      messageApi.open({
        key: "updata",
        type: "warning",
        content: "请稍后再尝试刷新",
      });
      return false;
    }
    cache.removeSiteData();
    getSiteData();
    setLastClickTime(currentTime);
  };

  return (
    <header className={`${status.siteState} h-80 p-8 relative text-white`}>
      {contextHolder}
      <SwitchTransition mode="out-in">
        <CSSTransition key={status.siteState} classNames="fade" timeout={300}>
          <div
            className={`${
              statusColor[status.siteState]
            } absolute top-0 left-0 h-full w-full -z-10`}
          />
        </CSSTransition>
      </SwitchTransition>
      <div className="max-w-4xl flex flex-col h-full px-4 m-auto">
        <div className="flex justify-between">
          <span className="text-xl">{siteName}</span>
          <div className="flex space-x-4">
            <CustomLink icon={<Home />} to={homeUrl} text="主页" />
            <CustomLink icon={<Star />} to={blogUrl} text="博客" />
            <CustomLink
              icon={<GithubOne />}
              to={`https://github.com/${githubName}/`}
              text="Github"
            />
            <CustomLink icon={<Mail />} to={`mailto:${emailUrl}`} text="邮件" />
          </div>
        </div>
        <div className="flex mt-auto">
          <div
            className={`rounded-full block bg-gray-100 mr-6 h-10 w-10 ${status.siteState} after:content-[''] after:h-full after:w-full after:rounded-full after:animate-ping after:block after:bg-inherit after:opacity-40`}
          />
          <div className="r-text">
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={status.siteState}
                classNames="fade"
                timeout={300}
              >
                <div className="text-4xl font-bold">
                  {statusNames[status.siteState]}
                </div>
              </CSSTransition>
            </SwitchTransition>
            <div className="text-sm mt-1 opacity-80">
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={status.siteState}
                  classNames="fade"
                  timeout={300}
                >
                  {status.siteState === "loading" ? (
                    <span>数据加载中...</span>
                  ) : status.siteState === "wrong" ? (
                    <span>这可能是临时性问题，请刷新后重试</span>
                  ) : (
                    <div className="flex items-center">
                      <span className="after:content-['|'] after:mx-2">
                        {`上次更新于 ${
                          formatTimestamp(cache.siteData?.timestamp).justTime
                        }`}
                      </span>
                      <div className="flex items-center">
                        <span>更新频率 5 分钟</span>
                        <Refresh className="ml-1" onClick={refreshStatus} />
                      </div>
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </div>
          </div>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={status.siteState}
              classNames="fade"
              timeout={300}
            >
              {status.siteState !== "loading" ? (
                <div className="ml-auto">
                  <div className="mb-1 opacity-80">
                    <span className="mr-1">站点总数</span>
                    <CountUp end={status.siteOverview.count} duration={1} />
                  </div>
                  <div className="flex text-xl">
                    <div className="after:content-['/'] after:mx-2">
                      <span className="mr-1">正常</span>
                      <CountUp end={status.siteOverview.okCount} duration={1} />
                    </div>
                    <div>
                      <span className="mr-1">异常</span>
                      <CountUp
                        end={status.siteOverview.downCount}
                        duration={1}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ml-auto" />
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </header>
  );
});

export default Header;
