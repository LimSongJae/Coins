import axios from "axios";
import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

export interface CharProps {
  coinId: string;
}

export interface ICoin {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

const Chart = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<CharProps>();
  const [loading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState<ICoin[]>();
  useEffect(() => {
    (async () => {
      const data = await (
        await axios.get(
          `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
        )
      ).data;
      setCoinData(data);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <>
      {loading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: coinData?.map((price) => price.time_open) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["red"],
            stroke: {
              curve: "smooth",
              width: 4,
            },
            tooltip: {
              y: { formatter: (value) => `$ ${value.toFixed(3)}` },
            },
            xaxis: {
              axisTicks: { show: false },
              labels: { show: false },
              axisBorder: { show: false },
              categories: coinData?.map((price) => price.time_close),
              type: "datetime",
            },
            yaxis: { show: false },
            theme: {
              mode: isDark ? "dark" : "light",
            },
          }}
        />
      )}
    </>
  );
};

export default Chart;
