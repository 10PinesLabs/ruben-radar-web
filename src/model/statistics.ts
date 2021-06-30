import {DEFAULT_RADAR_TEMPLATE_CONTAINER_MAX_VOTING_VALUE} from "./radarTemplateContainer";

export class Statistics {
  axisValues: number[];
  maxPoints: number;

  constructor(axisValues, maxPoints) {
    this.assertValidAxisValues(axisValues);
    this.axisValues = axisValues;
    this.maxPoints = maxPoints;
  }

  axisValuesObjToArray() {
    const values = new Array(this.maxPoints).fill(0);
    this.axisValues.forEach(value => values[value - 1]++ );
    return values;
  }

  mean() {
    if (this.hasVotes()) {
      let mean = 0;
      if (this.axisValues.length !== 0) {
        const sum = this.sumValues();
        mean = parseFloat((sum / this.axisValues.length).toFixed(2));
      }
      return mean;
    } else {
      return 'No posee votos';
    }
  }

  private hasVotes() {
    return this.axisValues.length > 0;
  }

  private sumValues() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.axisValues.reduce(reducer, 0);
  }

  private assertValidAxisValues(axisValues) {
    if (this.valuesMoreThanTenOrLessThanZero(axisValues)) {
      throw new Error('Valores de arista invalidos');
    }
  }

  private valuesMoreThanTenOrLessThanZero(axisValues) {
    let lessThanZero = false;

    axisValues.forEach(value => {
      if (0 > value || value > 10) {
        lessThanZero = true;
      }
    });
    return lessThanZero;
  }
}
