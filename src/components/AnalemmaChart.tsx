// src/components/AnalemmaChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { calculateAnalemmaData } from '../analemma';

interface AnalemmaChartProps {
  year: number;
  latitude: number;
  longitude: number;
}

const AnalemmaChart: React.FC<AnalemmaChartProps> = ({ year, latitude, longitude }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const data = calculateAnalemmaData(year, latitude, longitude);

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const container = svgRef.current.parentElement;
    if (!container) return;

    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .html('') // Clear previous render
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.equationOfTime) as [number, number])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.declination) as [number, number])
      .range([height, 0]);

    // Draw the analemma path
    const line = d3.line<{ equationOfTime: number; declination: number }>()
      .x(d => xScale(d.equationOfTime))
      .y(d => yScale(d.declination))
      .curve(d3.curveCatmullRom);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .append('text')
      .attr('fill', '#000')
      .attr('x', width / 2)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .text('Equation of Time (minutes)');


    svg.append('g')
      .call(yAxis)
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', -30)
      .attr('x', -height/2)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'middle')
      .text('Declination (degrees)');

    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text(`Analemma for ${year}`);

  }, [year, latitude, longitude]);

  return (
    <svg ref={svgRef} className="w-full h-full"></svg>
  );
};

export default AnalemmaChart;
