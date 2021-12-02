import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import {  LineSeries } from "react-stockcharts/lib/series";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
    EdgeIndicator,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { SingleValueTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class Line extends React.Component {
	render() {
        const gridY = {
            innerTickSize: -1 * (this.props.width - 150),
            tickStrokeDasharray: 'ShortDash',
            tickStrokeOpacity: 0.1,
            tickStrokeWidth: 1
        }

        const gridX = {
            innerTickSize: -1 * 370,
            tickStrokeDasharray: 'ShortDash',
            tickStrokeOpacity: 0.1,
            tickStrokeWidth: 1
        }

		const { type, data: initialData, width, ratio } = this.props;

		var keys = Object.keys(this.props.data[0])
		keys = keys.filter(e => e !== 'date' || e !== 'close')

		const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);

		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const COLORS = ['#44d2a8ff', '#fea75fff', '#5a9cfeff', '#e77681ff', '#6f42c1ff']

		const get_lines = () => {
			var keys = Object.keys(this.props.data[0])
			keys = keys.filter(e => e != 'date' && e !=='close')
			const lines = []
			var count = 130
			for (const x in keys) {
				const name = keys[x]
				if (this.props.view.includes(name)) {
					lines.push(
						<>
							<SingleValueTooltip fontFamily={'"Poppins", sans-serif'} valueFill="#EEEEEE" fontSize={16} labelFill={COLORS[x]} origin={[count,-15]} yLabel={name} yAccessor={d => d[name]} />
							<LineSeries stroke={COLORS[x]} strokeWidth={1.5} yAccessor={d => d[name]}/>
							<EdgeIndicator yAxisPad={10} fontFamily={'"Poppins", sans-serif'} itemType="last" orient="right" edgeAt="right"
								yAccessor={d => d[name]} />
						</>
					)
					count = count + 120
				}				
			}

			return lines
		}

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];
		return (
			<div onMouseEnter={() => this.props.setScroll(false)} onMouseLeave={() => this.props.setScroll(true)}>
				<ChartCanvas height={450}
					ratio={ratio}
					width={width}
					margin={{ left: 40, right: 110, top: 60, bottom: 20 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xScale={xScale}
					xAccessor={xAccessor}
					displayXAccessor={displayXAccessor}
				>
					<Chart id={1} yExtents={d => d.close}>
						<XAxis {...gridX} fontFamily={'"Poppins", sans-serif'} stroke='#FFC93DFF' tickStroke='#EEEEEE' axisAt="bottom" orient="bottom" ticks={5}/>
						<YAxis {...gridY} fontFamily={'"Poppins", sans-serif'} stroke='#FFC93DFF' tickStroke='#EEEEEE' axisAt="right" orient="right" ticks={5} />

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

							<SingleValueTooltip fontFamily={'"Poppins", sans-serif'} valueFill="#EEEEEE" labelFill="#ffc93dff" fontSize={16} origin={[0,-15]} yLabel={'You'} yAccessor={d => d.close} />
							<LineSeries stroke='#ffc93dff' strokeWidth={1.5} yAccessor={d => d.close}/>
							<EdgeIndicator yAxisPad={10} fontFamily={'"Poppins", sans-serif'} itemType="last" orient="right" edgeAt="right"
								yAccessor={d => d.close} />

						{get_lines()}

						<SingleValueTooltip fontFamily={'"Poppins", sans-serif'} valueFill="#EEEEEE" labelFill="#00C2EF" fontSize={12} origin={[0,-40]} yDisplayFormat={timeFormat("%m-%d %I:%M %p")} yLabel={'Date'} yAccessor={d => d.date} />

					</Chart>
					<CrossHairCursor stroke='#FFB900' />
				</ChartCanvas>
			</div>
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