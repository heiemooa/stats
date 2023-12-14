import { useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { formatNumber, formatDuration } from "@/utils/timeTools";
import { LinkTwo } from "@icon-park/react";
import { Tooltip, Button, Result, Modal } from "antd";
import CustomLink from "@/components/customLink";
import SiteCharts from "@/components/siteCharts";
import { reverse } from "lodash";
import useStores from "@/hooks/useStores";
import { observer } from "mobx-react-lite";
import { ISite } from "@/stores/cache";
import { isEmpty } from "lodash";

const SiteStatus = ({
  siteData,
  days,
}: {
  siteData: ISite[];
  days: number;
}) => {
  const { status } = useStores();

  // 弹窗数据
  const [siteDetailsShow, setSiteDetailsShow] = useState(false);
  const [siteDetailsData, setSiteDetailsData] = useState<ISite | null>(null);

  // 开启弹窗
  const showSiteDetails = (data: ISite) => {
    setSiteDetailsShow(true);
    setSiteDetailsData(data);
  };

  // 关闭弹窗
  const closeSiteDetails = () => {
    setSiteDetailsShow(false);
    setSiteDetailsData(null);
  };

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition key={status.siteState} classNames="fade" timeout={100}>
        {status.siteState !== "wrong" ? (
          status.siteState !== "loading" && !isEmpty(siteData) ? (
            <div>
              {siteData.map((site: ISite) => (
                <div
                  key={site.id}
                  className={`cursor-pointer p-7 border-b border-gray-200 duration-300 transition-all first:hover:rounded-lg last:hover:rounded-lg	last:border-b-0 hover:bg-gray-100 hover:transition-all hover:duration-300 ${
                    site.status !== "ok" ? "bg-red-50" : ""
                  }`}
                  onClick={() => {
                    showSiteDetails(site);
                  }}
                >
                  <div className="flex">
                    <div>{site.name}</div>
                    <CustomLink
                      icon={
                        <LinkTwo className="ml-2 text-gray-400 hover:text-green-500" />
                      }
                      to={site.url}
                    />
                    <div
                      className={`ml-auto ${
                        site.status === "ok"
                          ? "text-green-500"
                          : site.status === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      <div className="icon" />
                      <span className="text-sm">
                        {site.status === "ok" && "正常访问"}
                        {site.status === "down" && "无法访问"}
                        {site.status === "unknown" && "不受监控"}
                      </span>
                    </div>
                  </div>
                  <div className="my-4 flex">
                    {reverse([...site.daily]).map((data, index: number) => {
                      const { uptime, down, date } = data;
                      const time = date.format("YYYY-MM-DD");
                      let status = null;
                      let tooltipText = null;
                      if (uptime >= 100) {
                        status = "bg-green-500";
                        tooltipText = `可用率 ${formatNumber(uptime)}%`;
                      } else if (uptime <= 0 && down.times === 0) {
                        status = "bg-gray-300";
                        tooltipText = "无数据";
                      } else {
                        status = "bg-red-400";
                        tooltipText = `故障 ${
                          down.times
                        } 次，累计 ${formatDuration(
                          down.duration
                        )}，可用率 ${formatNumber(uptime)}%`;
                      }
                      return (
                        <Tooltip
                          key={index}
                          title={
                            <div>
                              <div className="text-xs text-gray-400">
                                {time}
                              </div>
                              <div>{tooltipText}</div>
                            </div>
                          }
                          destroyTooltipOnHide
                        >
                          <div
                            className={`mx-px h-7 grow rounded-lg	${status}`}
                          />
                        </Tooltip>
                      );
                    })}
                  </div>
                  <div className="flex text-gray-500 text-xs justify-between">
                    <div className="day">
                      {site.daily[site.daily.length - 1].date.format(
                        "YYYY-MM-DD"
                      )}
                    </div>
                    <div className="note">
                      {site.total.times
                        ? `最近 ${days} 天内故障 ${
                            site.total.times
                          } 次，累计 ${formatDuration(
                            site.total.duration
                          )}，平均可用率 ${site.average}%`
                        : `最近 ${days} 天内可用率 ${site.average}%`}
                    </div>
                    <div className="now">今天</div>
                  </div>
                </div>
              ))}
              {/* 站点详情 */}
              <Modal
                destroyOnClose
                title={siteDetailsData?.name}
                open={siteDetailsShow}
                footer={null}
                onOk={closeSiteDetails}
                onCancel={closeSiteDetails}
                width="80%"
                styles={{ body: { marginTop: "20px" } }}
              >
                {siteDetailsData && (
                  <SiteCharts siteDetails={siteDetailsData} />
                )}
              </Modal>
            </div>
          ) : (
            <div className="h-40 flex justify-center items-center">
              <div className="animate-spin h-8 w-8 rounded-full	border-4 border-t-gray-500 m-auto" />
            </div>
          )
        ) : (
          <Result
            status="error"
            title="调用超限或请求错误，请刷新后重试"
            extra={
              <Button
                type="primary"
                danger
                onClick={() => {
                  location.reload();
                }}
              >
                重试
              </Button>
            }
          />
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default observer(SiteStatus);
