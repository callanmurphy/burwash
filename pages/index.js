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
import style1 from '../styles/burwash.module.css';
import style2 from '../styles/ned.module.css';

const weeks = [[week1, ned1], [week2, ned2], [week3, ned3], [week4, ned4]];
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      menu: {name: 'burwash', index: 0, style: style1, colour: '#A30031'}
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
    const menu = this.state.menu;

    return (
      <div className="container">
        <script src="jquery-csv.js"></script>
        <Head>
          <title>Burwash Menu</title>
          <meta name="description" content="Burwash Dining Hall Menu (2021-2022) – Victoria University, Toronto ON. 
          See what's on for dinner by clicking through the daily schedule." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content={this.state.menu.colour} />
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
          <div className={menu.style['nav-bar']}>
            <a href="." >
              <img src={menu.name == 'burwash' ? '/crest-outlined.png' : '/crest-outlined-green.png'} alt="Vic Crest" className="logo-top" />
            </a>
          </div>
          <div>
            <h1 className='title'>{menu.name == 'burwash' ? 'Burwash' : 'Ned\'s'} Menu</h1>
            <h2 className='title2'>Week {this.getWeek()}</h2>
            <div className='row-container'>
              <button onClick={() => this.setState({menu: menu.name == 'burwash' ? {name: 'ned', index: 1, style: style2, colour: '#58ad60'} : {name: 'burwash', index: 0, style: style1, colour: '#A30031'} })} className={menu.style['swap']}>
                <p>{menu.name == 'ned' ? 'Burwash Menu' : 'Ned\'s Menu'}</p>
              </button>
            </div>
            {/* { menu.name == 'burwash' && <img src="/new.svg" alt="NEW" className={'new-ribbon'} />} */}
            <div className='row-container'>
              <button onClick={() => this.changeDate('backward')} className={menu.style['arrow']}>
                <img src="/arrow.svg" alt="Left Arrow" className={'left-arrow'} />
              </button>
              <h2 className={today.getDate() == new Date().getDate() && today.getMonth() == new Date().getMonth() ? menu.style['subtitle'] : menu.style['subtitle'] + ' other-day' }>
                {today.toDateString().replace('2021', '').replace('2022', '')}
              </h2>
              <button onClick={() => this.changeDate('forward')} className={menu.style['arrow']}>
                <img src="/arrow.svg" alt="Right Arrow" className={'right-arrow'} />
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
                {/* 
                "Pastries, Beverages-Hot & Cold, Yogurt, Milk, Whole Fruits, Snacks, Desserts" 
                "Classic Egg Salad on a Wrap(VEG) / Hummus and Roast Vegetables(VGN) / Tuna Salad on a Kaiser(H) / Roast Turkey and Cheddar Cheese"
                "Garden Salad / Crudités / Salad Bowl with Meat or Vegetable Protein"
                */}
                <table className={'mainTable ' + menu.style['mainTable']}>
                { weeks[this.getWeek() - 1][menu.index].map((col, index) => !(menu.name == 'ned' && (days[today.getDay()] == 'Sunday' || days[today.getDay()] == 'Saturday')) &&
                  ((col[this.formatDay(today.getDay())] != "" && col['title']) != "" || col['title'] == "DINNER") ?
                      ( col['title'] == "DAYS" || col['title'] == "DINNER" ) ? 
                      <tr>
                        <th className='heading'>{col['title'] == "DINNER" ? "Dinner" : index == 0 ? 'All Day' : 'Lunch'}</th>
                        <th className='heading table-newline'>{days[today.getDay()]}</th>
                      </tr>
                      :
                      <tr>
                        <td className='heading'>{col['title']}</td>
                        <td className='table-newline'>{col[this.formatDay(today.getDay())]}</td>
                      </tr>
                      :
                      null
                    )
                }
                { menu.name == 'ned' && !(days[today.getDay()] == 'Sunday' || days[today.getDay()] == 'Saturday') &&
                  <tr>
                    <td className='heading'>EVERYDAY</td>
                    <td className='table-newline'>Sandwiches / Salads / Snacks / Desserts / Beverages</td>
                  </tr>
                }
                </table>
                { menu.name == 'burwash' ?
                  <div id='schedule' className={'space-above'}>
                    <h3 className={menu.style['schedule-title'] + ' center'}>{menu.name == 'burwash' ? 'Burwash' : 'Ned\'s'} Schedule</h3>
                    { today.getDay() == 0 || today.getDay() == 6 ?
                      <div className="title2">
                        <b>Saturday, Sunday & Holidays</b>
                        <p>Brunch 10:00 a.m. - 2:30 p.m.</p>
                        <p>Dinner 4:00-7:30 p.m.</p>
                      </div> :
                      <div className="title2">
                          <b>Monday – Friday</b>
                          <p>Breakfast 7:30 a.m. - 10:30 a.m.</p>
                          <p>(Light Breakfast from 10:30 a.m. - 11:00 a.m.)</p>
                          <p>Lunch 11:00 a.m. - 3:30 p.m.</p>
                          <p>Dinner 4:00-7:30 p.m.</p>
                      </div>
                    }
                  </div> :
                  <div id='schedule' className={'space-above'}>
                  <h3 className={menu.style['schedule-title'] + ' center'}>{menu.name == 'burwash' ? 'Burwash' : 'Ned\'s'} Schedule</h3>
                  { today.getDay() == 0 || today.getDay() == 6 ?
                    <div className="title2">
                      <b>Saturday, Sunday & Holidays</b>
                      <p>Closed</p>
                    </div> :
                    today.getDay() == 5 ?
                    <div className="title2">
                      <b>Friday</b>
                      <p>11:00 a.m. - 3:30 p.m.</p>
                    </div> :
                    <div className="title2">
                      <b>Monday – Thursday</b>
                      <p>11:00 a.m. - 7:00 p.m.</p>
                    </div>
                  }
                  </div>
                }
                {/* <div className='row-container space-above'>
                  <button onClick={() => {window.scrollTo(0,document.body.scrollHeight + 500); this.setState({menu: menu.name == 'burwash' ? {name: 'ned', index: 1, style: style2, colour: '#58ad60'} : {name: 'burwash', index: 0, style: style1, colour: '#A30031'} })}} className={menu.style['swap']}>
                    <p>{menu.name == 'ned' ? 'Burwash Menu' : 'Ned\'s Menu'}</p>
                  </button>
                </div> */}
              </div>
            }
          </div>
        </main>

        <footer>
          <a href="https://vicu.utoronto.ca/" target="_blank" rel="noopener noreferrer">
            <img src={menu.name == 'burwash' ? '/crest.png' : '/crest-green.png'} alt="Vic Crest" className="logo" />
            {' '}Abeunt Studia in Mores
          </a>
        </footer>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          .heading {
            font-weight: 500;
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
            /* height: 50px; */
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

          .new-ribbon {
            position: absolute;
            width: 50px;
            left: 143px; 
            right: 0; 
            margin-left: auto; 
            margin-right: auto;
            top: 225px;
            transform: rotate(25deg);
          }
          
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
            padding-top: 35px;
          }
          
          .space-below {
            padding-bottom: 40px;
          }
          
          h2 {
            font-size: 26px
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
          
          .row-container {
            justify-content: center;
            text-align: center;
            display: flex;
            flex-direction: row;
            /* // margin-bottom: 30px; */
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
          
          footer {
            font-weight: 300;
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          footer a {
            display: flex;
            align-items: center;
            justify-content: center;
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
            .mainTable {
              width: 98%;
            }
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
