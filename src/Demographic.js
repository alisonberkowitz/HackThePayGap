import React, { Component } from 'react';
import request from 'superagent';
import { Line } from 'react-chartjs'
import Dropdown from './Dropdown';
import Me from './Me';

class Demographic extends Component {
  constructor(props) {
    super(props);
    this.state = {'sex': 'all', 'race': 'all', 'state': 'all',
      'chartdata': {}, 'meData': [] };
    this.handleChange = this.handleChange.bind(this);
    this.setChartData = this.setChartData.bind(this);
    this.loadMe = this.loadMe.bind(this);
  }

  setChartData(res) {
    var labels = [
      '($10.00k)-$0.00',
      '$0.00k-$10.00k',
      '$10.00k-$20.00k',
      '$20.00k-$30.00k',
      '$30.00k-$40.00k',
      '$40.00k-$50.00k',
      '$50.00k-$60.00k',
      '$60.00k-$70.00k',
      '$70.00k-$80.00k',
      '$80.00k-$90.00k',
      '$90.00k-$100.00k',
      '$100.00k-$110.00k',
      '$110.00k-$120.00k',
      '$120.00k-$130.00k',
      '$130.00k-$140.00k',
      '$140.00k-$150.00k',
      '$150.00k-$160.00k',
      '$160.00k-$170.00k',
      '$170.00k-$180.00k',
      '$180.00k-$190.00k',
      '$190.00k-$200.00k',
      '$200.00k-$210.00k',
      '$210.00k-$220.00k',
      '$220.00k-$230.00k',
      '$230.00k-$240.00k',
      '$240.00k-$250.00k',
      '$250.00k-$260.00k',
      '$260.00k-$270.00k',
      '$270.00k-$280.00k',
      '$280.00k-$290.00k',
      '$290.00k-$300.00k',
      '$300.00k-$310.00k',
      '$310.00k-$320.00k',
      '$320.00k-$330.00k',
      '$330.00k-$340.00k',
      '$340.00k-$350.00k',
      '$350.00k-$360.00k',
      '$360.00k-$370.00k',
      '$370.00k-$380.00k',
      '$380.00k-$390.00k',
      '$390.00k-$400.00k',
      '$400.00k-$410.00k',
      '$410.00k-$420.00k',
      '$420.00k-$430.00k',
      '$430.00k-$440.00k',
      '$440.00k-$450.00k',
      '$450.00k-$460.00k',
      '$460.00k-$470.00k',
      '$470.00k-$480.00k',
      '$480.00k-$490.00k',
      '$490.00k-$500.00k',
      '$500.00k-$510.00k',
      '$510.00k-$520.00k',
      '$520.00k-$530.00k',
      '$530.00k-$540.00k',
      '$540.00k-$550.00k',
      '$550.00k-$560.00k',
      '$560.00k-$570.00k',
      '$570.00k-$580.00k',
      '$580.00k-$590.00k',
      '$590.00k-$600.00k',
      '$600.00k-$610.00k',
      '$610.00k-$620.00k',
      '$620.00k-$630.00k',
      '$630.00k-$640.00k',
      '$640.00k-$650.00k',
      '$650.00k-$660.00k',
      '$710.00k-$720.00k',
      '$720.00k-$730.00k',
      '$730.00k-$740.00k',
      '$780.00k-$790.00k',
      '$810.00k-$820.00k',
      '$870.00k-$880.00k',
      '$950.00k-$960.00k'
    ]
    var self = this;
    this.setState({chartdata: {
      labels: labels,
      datasets: [
        {
          label: "My Demographic",
          fillColor: "rgba(0,0,220,0.5)",
          strokeColor: "rgba(0,0,220,1)",
          pointColor: "rgba(0,0,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: labels.map(function(key, i) {
            return self.state.meData[key];
          })
        },
        {
          label: "Selected Demographic",
          fillColor: "rgba(220,0,0,0.5)",
          strokeColor: "rgba(220,0,0,1)",
          pointColor: "rgba(220,0,0,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: labels.map(function(key) {
            return res.body[key];
          })
        }
      ]
    }});
  }

  handleChange(id, value) {
    this.state[id] = value;
    console.log(this.state);
    var queries = {};
    for(var property in this.state){
      if (this.state[property] !== 'all' && property!=='chartdata') {
        queries[property] = this.state[property];
      }
    }
    queries['api_key'] = 'LtvbgiOlXQTeMIYKaRhn36XvXO16wS1DcIwv4j4W';
    var self = this;
    request
      .get('https://api.commerce.gov/midaas/distribution')
      .query(queries)
      .end(function(err, res) {
        self.setChartData(res);
        console.log(res.body);
      })
  }

  loadMe(me) {
    this.setState({me: me}, () => {
      var queries = {};
      for(var property in this.state.me){
        if (this.state.me[property] !== 'all' && property!=='modalIsOpen') {
          queries[property] = this.state.me[property];
        }
      }
      queries['api_key'] = 'LtvbgiOlXQTeMIYKaRhn36XvXO16wS1DcIwv4j4W';
      var self = this;
      request
        .get('https://api.commerce.gov/midaas/distribution')
        .query(queries)
        .end(function(err, res) {
          self.setState({meData: res.body})
        })
    });
  }

  render() {
    var options = {};

    return (
      <div className="Demographic-wrapper">
        <div className="col-sm-4">
          <Me onChange={this.loadMe}/>
          <h2>Compare to:</h2>
          <div className="Demographic">
            <Dropdown
              id="race"
              options={["white", "black", "hispanic", "asian"]}
              onChange={this.handleChange} />
            <Dropdown
              id="sex"
              options={["male", "female"]}
              onChange={this.handleChange} />
            <Dropdown
              id="state"
              options={["AL", "AK", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]} 
              onChange={this.handleChange}/>
          </div>
        </div>
        <Line className="col-sm-8" data={this.state.chartdata} options={options} redraw/>
      </div>
    );
  }
}

export default Demographic;
