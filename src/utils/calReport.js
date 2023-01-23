export default function calTotalReports(arr, typeCal) {
  const date = new Date();
  const curentMonth = date.getMonth() + 1;

  let result = [];
  if (arr?.length === 1) {
    result = arr[0];
  } else {
    result = arr?.reduce((acc, curr, idx, arr) => {
      if (curr.month === curentMonth) acc[typeCal] = curr[typeCal];
      if (curr.month === curentMonth - 1)
        acc.totalLastMonth = curr.count || curr[typeCal];
      if (arr.length - 1 === idx) {
        acc.percent = Math.abs(100 - (acc[typeCal] * 100) / acc.totalLastMonth);
      }
      return acc;
    }, {});
  }
  return result;
}
