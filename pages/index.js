import Head from 'next/head'
import React, { Component } from 'react';
import week1 from '../data/burwash/week1.json';
import week2 from '../data/burwash/week2.json';
import week3 from '../data/burwash/week3.json';
import week4 from '../data/burwash/week4.json';
import ned1 from '../data/ned/week1.json';
import ned2 from '../data/ned/week2.json';
import ned3 from '../data/ned/week3.json';
import ned4 from '../data/ned/week4.json';

const weeks = [[week1, ned1], [week2, ned2], [week3, ned3], [week4, ned4]];
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const colour = '#A30031'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      menu: 0
    };
  }

  formatDay = (num) => {
    return String(num)
  }

  changeDate = (direction) => {
    if (direction == 'backward') {
      this.state.date.setDate(this.state.date.getDate() - 1)
    } else if (direction == 'forward') {
      this.state.date.setDate(this.state.date.getDate() + 1)
    } else {
      this.setState({date: new Date()})
    }
    // this.setState({date: this.state.date});
    this.setState({week: this.getWeek()});
  }

  getWeek = () => {
    // source: https://www.javatpoint.com/calculate-current-week-number-in-javascript
    var oneJan =  new Date(this.state.date.getFullYear(), 0, 1);   
    var numberOfDays =  Math.floor((this.state.date - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((numberOfDays - 2) / 7);
    var remainder = (result - -1) % 4
    return remainder + 1
  }

  render() {

    const today = this.state.date;

    return (
      <div className="container">
        <script src="jquery-csv.js"></script>
        <Head>
          <title>Burwash Menu</title>
          <meta name="description" content="Burwash Dining Hall Menu (2021-2022) – Victoria University, Toronto ON. 
          See what's on for dinner by clicking through the daily schedule." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="apple-touch-startup-image" href="/splash.png" />
          <link rel="icon" href="/favicon.ico" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-1KKXSS6LDE"/>
          <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1KKXSS6LDE', { page_path: window.location.pathname });
            `,
          }}
        />
        </Head>

        <main>
          {/* <div className='alert-bar'>
            <div className='inline'>
              <h2>Lunch and Dinner menu has swapped for today! (Dinner: Indian Butter Chicken)</h2>
            </div>
          </div> */}
          <div className={this.state.menu == 1 ? 'nav-bar green' : 'nav-bar'}>
            <a href="." >
              <img src="/crest-outlined.png" alt="Vic Crest" className="logo-top" />
            </a>
          </div>
          <div>
            <h1 className='title'>Burwash Menu</h1>
            <h2 className='title2'>Week {this.getWeek()}</h2>
            <div className='row-container'>
              <button onClick={() => this.setState({menu: this.state.menu == 0 ? 1 : 0 })} className={'arrow'}>
                <p>{this.state.menu == 1 ? 'Burwash Menu' : 'Ned\'s Menu'}</p>
              </button>
            </div>
            <div className='row-container'>
              <button onClick={() => this.changeDate('backward')} className='arrow'>
                <img src="/arrow.svg" alt="Left Arrow" className={this.state.menu == 1 ? 'left-arrow green' : 'left-arrow'} />
              </button>
              <h2 className={today.getDate() == new Date().getDate() && today.getMonth() == new Date().getMonth() ? 'subtitle' : 'subtitle other-day' }>
                {today.toDateString().replace('2021', '').replace('2022', '')}
              </h2>
              <button onClick={() => this.changeDate('forward')} className='arrow'>
                <img src="/arrow.svg" alt="Right Arrow" className={this.state.menu == 1 ? 'right-arrow green' : 'right-arrow'} />
              </button>
            </div>
            {/* <div className='row-container'>
              <button onClick={() => this.changeDate()} className={this.state.date.getDate() != new Date().getDate() ? 'arrow not-today' : 'arrow today'}>
                <img src="/undo.svg" alt="Undo" className="undo" />
              </button>
            </div> */}
            { (today.getMonth() == 11 && today.getDate() > 21) || (today.getMonth() == 0 && today.getDate() < 9) ?
              <div className='center'>
                <b>Closed for Winter Break</b>
              </div>
            : <div>
                {today.getMonth() == 0 && today.getDate() == 9 &&
                  <div className='center space-below'>
                    <b>Dinner Only (first meal of 2022)</b>
                  </div>
                }
                <table className='mainTable'>
                { weeks[this.getWeek() - 1][this.state.menu].map((col, index) => 
                  ((col[this.formatDay(today.getDay())] != "" && col['Victoria University Food Services Burwash Dining Hall']) != "" || col['Victoria University Food Services Burwash Dining Hall'] == "DINNER") ?
                      ((col['Victoria University Food Services Burwash Dining Hall'] == "WEEK " + this.getWeek()) || col['Victoria University Food Services Burwash Dining Hall'] == "DINNER" ) ? 
                      <tr>
                        <th className='heading'>{col['Victoria University Food Services Burwash Dining Hall'] == "DINNER" ? "Dinner" : index == 0 ? 'All Day' : 'Lunch'}</th>
                        <th className='heading table-newline'>{days[today.getDay()]}</th>
                      </tr>
                      :
                      <tr>
                        <td className='heading'>{col['Victoria University Food Services Burwash Dining Hall']}</td>
                        <td className='table-newline'>{col[this.formatDay(today.getDay())]}</td>
                      </tr>
                      :
                      null
                    )
                }
                </table>
                <div>
                  { today.getDay() == 0 || today.getDay() == 6 ?
                    <div className="title2 space-above">
                      <b>Saturday, Sunday & Holidays</b>
                      <p>Brunch 10:00 a.m. - 2:30 p.m.</p>
                      <p>Dinner 4:00-7:30 p.m.</p>
                    </div> :
                    <div className="title2 space-above">
                        <b>Monday – Friday</b>
                        <p>Breakfast 7:30 a.m. - 10:30 a.m.</p>
                        <p>(Light Breakfast from 10:30 a.m. - 11:00 a.m.)</p>
                        <p>Lunch 11:00 a.m. - 3:30 p.m.</p>
                        <p>Dinner 4:00-7:30 p.m.</p>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </main>

        <footer>
          <a href="https://vicu.utoronto.ca/" target="_blank" rel="noopener noreferrer">
            <img src="/crest.png" alt="Vic Crest" className="logo" />
            {' '}Abeunt Studia in Mores
          </a>
        </footer>

        <style jsx>{`
          .heading {
            font-weight: 500;
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

          .alert-bar {
            position: absolute;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            top: 0px;
            left: 0px;
            right: 0px;
            width: 100%;
            background: #FFFF60;
            // height: 50px;
            z-index: 20;
            padding-left: 50px;
            padding-right: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
            -webkit-box-shadow: 0px 0px 6px 3px rgba(41,41,41,.25);
            -moz-box-shadow: 0px 0px 6px 3px rgba(41,41,41,.25);
            box-shadow: 0px 0px 6px 3px rgba(41,41,41,.25);
          }

          .alert-bar h2 {
            font-size: 16px;
          }

          // .inline {
          //   display: flex;
          //   align-items: center;
          // }

          main {
            background-color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            padding-top: 100px;
            padding-bottom: 40px;
            margin: 0 4%;
          }

          .title {
            text-align: center;
            font-weight: 400;
          }

          .title2 {
            text-align: center;
            font-weight: 300;
          }

          .center {
            text-align: center;
          }

          .space-above {
            padding-top: 45px;
          }

          .space-below {
            padding-bottom: 40px;
          }

          h2 {
            font-size: 26px
          }

          .subtitle {
            text-align: center;
            width: 200px;
            color: #A30031;
            font-weight: 400;
          }

          .other-day {
            color: black;
          }
          
          .mainTable {
            margin: 0 auto;
            text-align: center;
            width: 80%;
            border-radius: 10px 10px 0px 0px;
            overflow: hidden;
            font-weight: 300;
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
            background-color: #f7f7f7;
          }

          .table-newline {
            white-space: pre-line;
            width: 70%;
          }

          .green {
            background-color: #58ad60
          }


          .row-container {
            justify-content: center;
            text-align: center;
            display: flex;
            flex-direction: row;
            // margin-bottom: 30px;
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
            margin-top: 10px;
          }

          .today {
            margin-top: -30px;
            opacity: 30%;
            cursor: auto;
          }

          .not-today {
            margin-top: -30px;
            opacity: 100%;
          }
          
          .undo {
            width: 40px;
          }

          .arrow:hover {
            background-color: #7A0025;
          }

          footer {
            font-weight: 300;
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            // margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            align-items: center;
            justify-content center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .logo-top {
            height: 2.5em;
          }

          .right-arrow {
            height: 1.7em;
          }

          .left-arrow {
            height: 1.7em;
            transform: rotate(180deg);
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
            .mainTable {
              width: 98%;
            }
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
