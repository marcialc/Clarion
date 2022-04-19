export const Oldoptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
        // position: 'top' as const,
        // labels: {
        //   font: {
        //     size: 15
        //   },
        //   generateLabels: (chart: any) => {
        //     console.log("LABELS: ", chart.data);
        //     var data = chart.data.datasets;
        //     if (data.length) {
        //       return data.map(function(label: any, i: number) {
        //         var meta = chart.getDatasetMeta(0);
        //         var ds = data[0];
        //           return {
        //           fillStyle: label.backgroundColor,
        //           strokeStyle: label.backgroundColor,
        //           hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
        //           text: capitalize(label.label),
        //           index: i
        //         };
        //       });
        //     }
        //     return [];
        //   }
        // }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        cornerRadius: 6,
        boxPadding: 5,
        callbacks: {
          label: (coin: any) => {
            // console.log("callback coin: ",coin)
            const percentage = `% ${roundUp(coin.raw)}`;
            return `${capitalize(coin.dataset.label)}: ${percentage}`;
          },
          labelPointStyle: function(context: any) {
            return {
                pointStyle: 'triangle',
                rotation: 0
            };
        }
        }
      }
    },
    scales: {
    },
    // onHover: function(el: any){
    //   // console.log("Element: ",el.x)
    //   // xAxis = el.x;
    // },
    hitRadius: 30,
    pointRadius: 0,
    pointHoverRadius: 5,
    pointHitRadius: 7,
    hoverBackgroundColor: 'white',
    pointHoverBorderWidth: 3,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context: any) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 10 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
  };




  {legenItems &&
    legenItems.map((coin: any, index: number) => {
      return (
        <div
          onClick={() => console.log("CLICKED coin")}
          key={coin.name}
          style={{ background: colors[index] }}
          className={styles.tooltip}
        >
          <p style={{ padding: "0 1rem" }}>
            {capitalizeWord(coin.name)} 
          </p>
          <p>${coin.price}</p>
          <p>${coin.difference}</p>
          <p>{coin.percentage}</p>
          <AiFillDelete
            size="1rem"
            color="#11092A"
            onClick={(e) => deleteB(e, coin.name)}
          />
        </div>
      );
    })}