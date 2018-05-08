import * as d3 from 'd3';
import chartFactory from '../common/index';
import tableFactory from './table-factory';

export default async function lifeExpectancyTable() {
  const getData = async () => {
    try {
      const response = await fetch('data/who-gho-life-expectancy.json');
      const raw = await response.json();
      return raw.fact.filter(d => d.dim.GHO === 'Life expectancy at birth (years)'
        && d.dim.SEX === 'Both sexes' && d.dim.YEAR === '2014')
        .map(d => [
          d.dim.COUNTRY,
          d.Value,
        ]);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };
  const data = await getData();
  data.unshift(['Country', 'Life expectancy (years from birth)']);
  return tableFactory(data).table
    .selectAll('tr')
    .filter()
    .sort(([countryA, yearsA], [countryB, yearsB]) => yearsA - yearsB);
};

export async function renderSVGStaff() {
  const chart = chartFactory();
  const text = chart.container.append('text')
    .text("Csafeci fn'est padfs un trewrka!")
    .attr('x', 50)
    .attr('y', 200)
    .attr('text-anchor', 'start');
}