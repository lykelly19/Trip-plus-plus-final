import React from 'react'
import './widget.css';
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
                <a className="weatherwidget-io" href="https://forecast7.com/en/52d5213d40/berlin/" data-label_1="BERLIN" data-label_2="WEATHER" data-theme="blue-mountains" >BERLIN WEATHER</a>

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

        </div>
    )
}

export default Home;


// raw script
//!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');