import React from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	CurrentCoordinate,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import { utcMinute } from "d3-time";

import {timeIntervalBarWidth} from "react-stockcharts/lib/utils"

class Candle extends React.Component {
	render() {

        const gridY = {
            innerTickSize: -1 * (this.props.width - 150),
            tickStrokeDasharray: 'ShortDash',
            tickStrokeOpacity: 0.1,
            tickStrokeWidth: 1
        }

        const gridX = {
            innerTickSize: -1 * 400,
            tickStrokeDasharray: 'ShortDash',
            tickStrokeOpacity: 0.1,
            tickStrokeWidth: 1
        }
        
        const candlesAppearance = {
            wickStroke: function fill(d) {
                return d.close > d.open ? "#00B35E" : "#FE5656";
              },
            fill: function fill(d) {
              return d.close > d.open ? "#00B35E" : "#FE5656";
            },
            stroke: "#00000000",
            widthRatio: 1,
            opacity: 1,
          }

		const { type, data, width, ratio } = this.props;

		const xAccessor = d => d.date;
		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={450}
					ratio={ratio}
					width={width}
					margin={{ left: 40, right: 110, top: 20, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xScale={scaleTime()}
					xAccessor={xAccessor}
					xExtents={xExtents}>
                        
				<Chart id={2}
						yExtents={[d => d.volume]}
						height={75} origin={(w, h) => [0, h - 75]}>

					<BarSeries yAccessor={d => d.volume} width={2} fill={d => d.close > d.open ? "#00B35E" : "#FE5656"} />

					<CurrentCoordinate yAccessor={d => d.volume} fill="#FFB900" />
				</Chart>
				<Chart id={1}
						yExtents={[d => [d.high, d.low]]}
						padding={{ top: 40, bottom: 20 }}>
					<XAxis {...gridX} fontFamily={'"Poppins", sans-serif'} stroke='#FFB900' tickStroke='#EEEEEE' axisAt="bottom" orient="bottom"/>
					<YAxis {...gridY} fontFamily={'"Poppins", sans-serif'} stroke='#FFB900' tickStroke='#EEEEEE' axisAt="right" orient="right" ticks={5} />

					<MouseCoordinateX
						rectWidth={60}
						at="bottom"
						orient="bottom"
                        fontFamily={'"Poppins", sans-serif'}
						displayFormat={timeFormat("%I:%M:%S %p")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						dx={8}
                        fontFamily={'"Poppins", sans-serif'}
						displayFormat={format(".2f")} />

					<CandlestickSeries width={timeIntervalBarWidth(utcMinute.every(10))}  {...candlesAppearance}/>

					<EdgeIndicator yAxisPad={10} lineStroke={d => d.close > d.open ? "#00B35E" : "#FE5656"} fontFamily={'"Poppins", sans-serif'} itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#00B35E" : "#FE5656"}/>

					<OHLCTooltip fontFamily={'"Poppins", sans-serif'} textFill="#EEEEEE" labelFill="#00C2EF" origin={[0, 0]} xDisplayFormat={timeFormat("%Y-%m-%d %I:%M %p")}/>
				</Chart>
				<CrossHairCursor stroke='#FFB900' />
			</ChartCanvas>
		);
	}
}

Candle.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

Candle.defaultProps = {
	type: "svg",
};
Candle = fitWidth(Candle);

export default Candle;