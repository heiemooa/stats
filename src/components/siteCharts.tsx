import { Alert, Collapse } from "antd";
import { MacScrollbar } from "mac-scrollbar";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { isEmpty, assign, map } from "lodash";
import { ISite } from "@/stores/cache";

const SiteCharts = ({ siteDetails }: { siteDetails: ISite }) => {
  const chart = useRef(null);
  const myChart = useRef<any>(null);

  // 处理传入数据为图表
  const dailyData = siteDetails.daily;

  useEffect(() => {
    init();
    window.addEventListener("resize", function () {
      init();
    });
    return () => {
      window.removeEventListener("resize", function () {
        init();
      });
    };
  }, [JSON.stringify(dailyData)]);

  const init = () => {
    if (!chart.current) return;
    myChart.current?.dispose?.();
    myChart.current = echarts.init(chart.current);

    const chartData = [...dailyData].reverse().map((data) => {
      const { uptime, date } = data;
      return {
        time: date.format("YYYY-MM-DD"),
        value: Number(uptime),
      };
    });

    if (isEmpty(chartData)) return;
    const option = assign({
      xAxis: {
        type: "category",
        data: map(chartData, (item) => item.time),
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} %",
        },
      },
      series: [
        {
          data: map(chartData, (item) => item.value),
          type: "line",
          smooth: true,
          showSymbol: false,
          tooltip: {
            valueFormatter: (value: number) => `${value} %`,
          },
        },
      ],
      graphic: isEmpty(chartData)
        ? [
            {
              type: "text",
              left: "center",
              top: "middle",
              style: {
                text: "暂无数据",
                fontSize: 18,
                fill: "#999",
              },
            },
          ]
        : [],
      tooltip: {
        trigger: "axis",
      },
    });
    myChart.current.setOption(option, true);
  };

  return (
    <MacScrollbar style={{ maxHeight: "66vh" }}>
      <div className="site-details">
        {siteDetails.status !== "ok" ? (
          siteDetails.average >= 70 ? (
            <Alert
              message="当前站点出现异常，请检查站点状态"
              type="warning"
              showIcon
            />
          ) : (
            <Alert
              message="当前站点持续异常，请立即检查站点状态或从监控项目中删除"
              type="error"
              showIcon
            />
          )
        ) : (
          <Alert
            message="当前站点状态正常，请继续保持哦"
            type="success"
            showIcon
          />
        )}
        <div>
          <div ref={chart} className="w-full h-96" />
          <Collapse
            style={{ marginTop: "20px" }}
            items={[
              {
                key: "all-data",
                label: "站点详情初始数据",
                children: <p>{JSON.stringify(siteDetails)}</p>,
              },
            ]}
          />
        </div>
      </div>
    </MacScrollbar>
  );
};

export default SiteCharts;
