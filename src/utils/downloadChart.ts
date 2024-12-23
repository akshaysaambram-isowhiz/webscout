import { toPng } from "html-to-image";

type DownloadChartProps = {
  chartId: string;
  downloadId: string;
  fileName: string;
};

export const downloadChart = ({
  chartId,
  downloadId,
  fileName,
}: DownloadChartProps) => {
  const chartNode = document.getElementById(chartId);
  const downloadButton = document.getElementById(downloadId);

  if (!chartNode || !downloadButton) {
    return;
  }

  // Hide the button
  downloadButton.style.display = "none";

  toPng(chartNode)
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();
    })
    .catch((err) => {
      console.error("Error exporting chart:", err);
    });

  downloadButton.style.display = "block";
};
