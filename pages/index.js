import Head from 'next/head'
import React, { Component } from 'react';
import week1 from '../data/week1.json';
import week2 from '../data/week2.json';
import week3 from '../data/week3.json';
import week4 from '../data/week4.json';

const weeks = [week1, week2, week3, week4];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  formatDay = (num) => {
    if (num == 1) {
      return ""
    } else if (num == 0) {
      return "__6"
    } else {
      return "__" + String(num - 1) 
    }
  }

  changeDate = (direction) => {
    if (direction == 'backward') {
      this.state.date.setDate(this.state.date.getDate() - 1)
    } else if (direction == 'forward') {
      this.state.date.setDate(this.state.date.getDate() + 1)
    }
    // this.setState({date: this.state.date});
    this.setState({week: this.getWeek()});
  }

  getWeek = () => {
    // source: https://www.javatpoint.com/calculate-current-week-number-in-javascript
    var oneJan =  new Date(this.state.date.getFullYear(), 0, 1);   
    var numberOfDays =  Math.floor((this.state.date - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((numberOfDays - 2) / 7);
    var remainder = (result - 39) % 4
    return remainder + 1
  }

  render() {

    const date = this.state.date;

    return (
      <div className="container">
        <script src="jquery-csv.js"></script>
        <Head>
          <title>Burwash Menu</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className='nav-bar'>
            <a
              href="https://vicu.utoronto.ca/hospitality-services/student-meal-plans-and-dining-hall-menus/burwash-dining-hall-and-neds-cafe/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/crest.svg" alt="Vic Crest" className="logo-top" />
            </a>
          </div>
          <div>
            <h1 className='title'>Burwash Menu</h1>
            <h2 className='title'>Week {this.getWeek()}</h2>
            <div className='row-container'>
              <button onClick={() => this.changeDate('backward')} className='arrow'>{'<'}</button>
              <h2 className='subtitle'>{date.toDateString()}</h2>
              <button onClick={() => this.changeDate('forward')} className='arrow'>{'>'}</button>
            </div>
            <table className='mainTable'>
            { weeks[this.getWeek() - 1].map((row, index) => row[this.formatDay(this.state.date.getDay())] && row['Victoria University Food Services Burwash Dining Hall'] &&
                  (row['Victoria University Food Services Burwash Dining Hall'] == "WEEK " + this.getWeek() ? 
                  <tr>
                    <th className='heading'>{index == 0 ? 'LUNCH' : 'DINNER'}</th>
                    <th>{row[this.formatDay(this.state.date.getDay())]}</th>
                  </tr>
                  :
                  <tr>
                    <td className='heading'>{row['Victoria University Food Services Burwash Dining Hall']}</td>
                    <td>{row[this.formatDay(this.state.date.getDay())]}</td>
                  </tr>
                ))
            }
            </table>
          </div>
        </main>

        <footer>
          <a
            href="https://vicu.utoronto.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/crest.svg" alt="Vic Crest" className="logo" />
            {' '}Abeunt Studia in Mores
          </a>
        </footer>

        <style jsx>{`
          .heading {
            font-weight: bold;
          }

          .nav-bar {
            position: absolute;
            /* position: fixed; */
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            background: #A30031;
            height: 80px;
            z-index: 10;
            -webkit-box-shadow: 0px 0px 6px 3px rgba(41,41,41,.25);
            -moz-box-shadow: 0px 0px 6px 3px rgba(41,41,41,.25);
            box-shadow: 0px 0px 6px 3px rgba(41,41,41,.25);
          }

          main {
            background-color: #ffffff;
            font-family: "Helvetica Neue", Helvetica, sans-serif;
            padding-top: 100px;
            padding-bottom: 70px;
            margin: 0 4%;
          }

          .title {
            text-align: center;
          }

          .subtitle {
            text-align: center;
            color: #A30031;
            padding-left: 18px;
            padding-right: 18px;
          }

          
          .mainTable {
            margin: 0 auto;
            text-align: center;
            border-radius: 10px 10px 0px 0px;
            overflow: hidden;
          }

          .mainTable th {
            background-color: #A30031;
            height: 50px;
            color: #ffffff;
          }

          .mainTable tr {
            background-color: #dfdfdf;
            color: #161616;
            width: 100%;
            overflow: hidden;
          }

          .mainTable th,
          .mainTable td {
            padding: 12px 15px;
          }

          .mainTable th:first-child {
            border-radius: 10px 0 0 0px;
          }

          .mainTable th:last-child {
            border-radius: 0 10px 0px 0;
          }

          .mainTable tr:nth-of-type(even) {
            background-color: #f3f3f3;
          }


          .row-container {
            justify-content: center;
            text-align: center;
            padding-bottom: 35px;
            display: flex;
            flex-direcction: row;
          }

          .arrow {
            background-color: #A30031;
            border-radius: 10px;
            border: none;
            align-self: flex-start;
            color: white;
            padding: 8px 18px;
            font-size: 20px;
            cursor: pointer;
            margin-top: 15px;
          }

          .arrow:hover {
            background-color: #7A0025;
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .logo-top {
            height: 2.5em;
          }

          .logo {
            height: 1.5em;
            margin-right: 12px;
          }

          @media screen and (min-width: 0px) and (max-width: 650px) {
            // .arrow {
            //   align-self: none;
            //   color: blue;
            // }
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    )
  }
}

export default Home;
