//anychart.onDocumentReady(function () {
	// set chart theme
//anychart.theme('sea');
      // The data used in this sample can be obtained from the CDN
      // https://cdn.anychart.com/csv-data/csco-daily.csv
      anychart.data.loadCsvFile(
     '../dataDemo.csv',
      //'../data.csv',
      function (data) {
        // create data table on loaded data
        // cra la tabla de datos en la tabla cargada
        var dataTable = anychart.data.table();
        dataTable.addData(data);

        // map loaded data
        // mapa de datos cargados
        var mapping = dataTable.mapAs({
            open: 1,
            high: 2,
            low: 3,
            close: 4,
            value: {
              column: 6,
              type: 'sum'
            }
          });

        // create stock chart
        // crear grafico de stock
        var chart = anychart.stock();

        // set chart padding
        //establecer el relleno del gráfico
        chart.padding().right(60);

        // create plot on the chart
        // crear trama en el gráfico
        var plot = chart.plot(0);

        // enabled x-grid/y-grid
        // habilitar cuadricula x / cuadricula y
        plot.xGrid(true).yGrid(true);

        // set orientation y-axis to the right side
        // establecer la orientación del eje y en el lado derecho
        plot.yAxis().orientation('right');

        // create candlestick series on the plot
        // crear series de velas en la trama
        var aaplSeries = plot.candlestick(mapping);

        // set series settings
        // establecer la configuración de la serie
        aaplSeries.name('AAPL').zIndex(50);
        aaplSeries
          .risingFill('green', 0.5)
          .fallingFill('red', 0.5)
          .risingStroke('green', 0.5)
          .fallingStroke('red', 0.5);

        // create EMA indicators with period 50 on the plot
        // crear indicadores EMA con período 50 en el gráfico
        var ema = plot.ema(
          dataTable.mapAs({
            value: 4
          })
        );
        ema.series().stroke('1.5 #5FB1EE');

        // create annotation
        // crear plot
        var annotation = plot.annotations();

        //crear triángulo de anotación
        annotation.triangle({
          // X - part of the first anchor
          // X - parte del primer anclaje
          xAnchor: '2016-09-09',
          // Y - part of the first anchor
          // Y - parte del primer anclaje
          valueAnchor: 103.13,
          // X - part of the second anchor
          // X - parte del segundo anclaje
          secondXAnchor: '2016-09-15',
          // Y - part of the second anchor
          // Y - parte del segundo anclaje
          secondValueAnchor: 115.57,
          // X - part of the third anchor
          // X - parte del tercer anclaje
          thirdXAnchor: '2016-10-25',
          // Y - part of the third anchor
          // Y - parte del tercer anclaje
          thirdValueAnchor: 118.25,
          // set stroke settings
          // establecer la configuración de trazo
          stroke: '1.5 #6E9C4E 0.5',
          // set fill settings
          // establecer la configuración de relleno
          fill: '#6E9C4E 0.15',
          // disable interaction with annotation
          // deshabilitar la interacción con la anotación
          allowEdit: false
        });

        // create volume series on the plot
        // crear series de volumen en el plot
        var volumeSeries = plot.column(mapping);
        // set series settings
        // establecer la configuración de la serie
        volumeSeries.name('Volume').zIndex(100).maxHeight('20%').bottom(0);
        volumeSeries.legendItem({
          iconEnabled: false,
          textOverflow: ''
        });

        // create a logarithmic scale
        // crear una escala logarítmica
        var customScale = anychart.scales.log();
        // sets y-scale
        // establece la escala y
        volumeSeries.yScale(customScale);

        // set volume rising and falling stroke settings
        // establecer la config de carrera ascendente y descendente del volumen
        volumeSeries.risingStroke('red');
        volumeSeries.fallingStroke('green');

        // set volume rising and falling fill settings
        // establecer la config de llenado ascendente y descendente del volumen
        volumeSeries.risingFill('red .5');
        volumeSeries.fallingFill('green .5');

        // set chart selected date/time range
        //establecer gráfico rango de fecha/hora seleccionado
        chart.selectRange('2016-07-01', '2016-12-30');

        // set container id for the chart
        // establecer la identificación del contenedor para el gráfico
        chart.container('container');

        // initiate chart drawing
        // iniciar el dibujo del gráfico
        chart.draw();

        // create range picker
        // crear selector de rango
        var rangePicker = anychart.ui.rangePicker();

        // init range picker
        // selector de rango inicial
        rangePicker.render(chart);

        // create range selector
        // crear selector de rango
        var rangeSelector = anychart.ui.rangeSelector();

        // init range selector
        // selector de rango inicial
        rangeSelector.render(chart);
      }
    )