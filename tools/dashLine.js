import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
    LineSeries
} from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
    EdgeIndicator,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class Line extends React.Component {
	render() {
        const gridY = {
            innerTickSize: -1 * (this.props.width - 55),
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


		const { type, data: initialData, width, ratio } = this.props;

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];
		return (
			<ChartCanvas height={500}
				ratio={ratio}
				width={width}
				margin={{ left: 0, right: 80, top: 20, bottom: 80 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
			>
				<Chart id={1}
					yExtents={d => [d.high, d.low]}
				>
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

                    <LineSeries stroke='#00C2EF' strokeWidth={1.5} yAccessor={d => d.close}/>

                    <EdgeIndicator yAxisPad={10} lineStroke={d => d.close > d.open ? "#00B35E" : "#FE5656"} fontFamily={'"Poppins", sans-serif'} itemType="last" orient="right" edgeAt="right"
						yAccessor={d => d.close} fill={d => d.close > d.open ? "#00B35E" : "#FE5656"}/>

                <OHLCTooltip fontFamily={'"Poppins", sans-serif'} textFill="#EEEEEE" labelFill="#00C2EF" origin={[0, 0]} xDisplayFormat={timeFormat("%Y-%m-%d %I:%M %p")}/>

				</Chart>
				<Chart id={2}
					yExtents={d => d.volume}
					height={75} origin={(w, h) => [0, h - 75]}
				>
					<BarSeries yAccessor={d => d.volume}
						stroke fill={(d) => d.close > d.open ? "#00B35E" : "#FE5656"}
						opacity={0.4}
						widthRatio={1} />
				</Chart>
				<CrossHairCursor stroke='#FFB900' />
			</ChartCanvas>
		);
	}
}

Line.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

Line.defaultProps = {
	type: "svg",
};
Line = fitWidth(Line);

export default Line;