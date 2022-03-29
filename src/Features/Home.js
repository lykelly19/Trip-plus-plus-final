import React from 'react';
import './widget.css';
import './Home.css';
import BudgetingPreview from './Budgeting Preview.png';
import ItineraryPreview from './Itinerary Preview.png';
import PackingPreview from './Packing Preview.png';
import BudgetingPreviewChart from './Budget Preview Chart.png';


export function AddWeather() {
    const script = document.createElement('script');
    script.innerHTML = 
    "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=\'https://weatherwidget.io/js/widget.min.js\';fjs.parentNode.insertBefore(js,fjs);}}(document,\'script\',\'weatherwidget-io-js\');"
    script.async = false;
    document.body.appendChild(script);
}

const Home = () => {
    return(
        <div>
            <p>Home component</p>
    
            <div class="weatherDiv">
                <a className="weatherwidget-io mx-auto" href="https://forecast7.com/en/52d5213d40/berlin/" data-label_1="BERLIN" data-label_2="WEATHER" data-theme="blue-mountains" >BERLIN WEATHER</a>

                {!function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    js = d.createElement(s);
                    js.id = id;
                    js.src = 'https:weatherwidget.io/js/widget.min.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }
                    (document, 'script', 'weatherwidget-io-js')
                }

                {AddWeather()}
            </div>

            <div className="mt-5">
                <div className="featurePreview" id="itineraryPreview">
                    <div className="previewContent mt-5 mx-4 pt-4">
                        <p id="upcomingText">Upcoming:</p>
                        <div className="itineraryText">
                            <p>2/21/2022 @ 7:21 PM</p>
                            <p>Visit Thessaliniki</p>
                        </div>
                    </div>
                    <p>Itinerary</p>
                </div>
                <div className="featurePreview" id="budgetPreview">
                    <div className="mt-2 mx-4 pt-3">
                        <img src={BudgetingPreviewChart} alt="preview budgeting donut chart"></img>
                    </div>
                    <p>Budget</p>
                </div>
                <div className="featurePreview" id="packingPreview">
                    <div className="previewContent mt-5 mx-4 pt-5">
                        <p id="numItems">5</p>
                        <p>items left to pack</p>
                    </div>
                    <p>Packing</p>
                </div>

            </div>

        </div>
    )
}

export default Home;


// raw script
//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');