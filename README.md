### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly - Software Engineering Immersive

# GA Project 4 - Street Share


## Overview

Street Share is a full-stack app built using Python with Flask for the back end, and React for the front end. The app allows users to share their household belongings (such as bikes, DIY equipment etc) with others in the community. I worked on this project with one other student, and delivered the MVP over the course of 7 days.

You can access the site [here](https://street-share-app.herokuapp.com/).

![](https://imgur.com/7sILonc.png)

## Brief  

### Technical Requirements

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Flask API** using a Flask REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
​
### Necessary Deliverables 

* A **working app** hosted on the internet
* A **link to your hosted working app** in the URL section of your GitHub repo
* A **git repository hosted on GitHub**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project
* **A `readme.md` file** with:
    * An embedded screenshot of the app
    * Explanations of the **technologies** used
    * A couple of paragraphs about the **general approach you took**
    * **Installation instructions** for any dependencies
    * Link to your **user stories/wireframes** – sketches of major views / interfaces in your application, if applicable
    * Descriptions of any **unsolved problems** or **major hurdles** you had to overcome
​
---


## Technologies Used

- **Frontend:** HTML, CSS, SASS, Javascript, React Hooks, Axios, Google Maps + Geolocation, React Hook Form, Socket.IO
- **Backend:** Python, Flask, SQLAlchemy, Marshmallow, Cloudinary, Flask-Sockets.io
- **Tools:** Git, GitHub, Heroku, Trello, InVision


## Approach

### Planning

My teammate, Yusuf, came up with the concept for Street Share. We discussed at a high level how the site should function, the value proposition, and key functionalities we wanted to include ahead of the official project kick off. 

Once the project kicked off, we used Trello to discuss and prioritize various features of the app, and then prioritised them into Must have, Should have, Could have and Won't have (MoSCoW prioritisation).

With the main features agreed, we began to whiteboard all the necessary screens and user journeys using InVision. This was a useful process as we both had different ideas about how things should work, for example how to manage the item booking process, and by whiteboarding this out we were both aligned on what needed to be built. We also used InVision to plan out the various tables needed to accomplish the result.

Finally, after the wireframes were agreed, we set up a new Trello board as a Kanban board to manage tasks and user stories.

### Back End Development

My teammate and I split the back end development evenly. We built the user model and controller together as this was key to the other models, but worked independently on the remaining models.

#### Web Sockets - Back end

One of the key functionalities of the app is to allow messaging between users, so they can arrange bookings, ask questions etc. I had wanted to test out WebSockets for some time and this was the perfect opportunity to do so.

**Setup**

The app was built using Pipenv to manage packages and provide the virtualenv. With Flask installed, the app could be run using a command `pipenv run flask run` to start the server. The command mentioned is a newer feature within Flask, and is considered best practice for Flask projects. However, this caused issues down the road when trying to implement WebSockets. I used the `flask-socketio` library, which requires a different server setup:

**app.py**

```py
#...
if __name__ == '__main__':
    socketio.run(app)

```
The above could be run using `pipenv run python server/app.py`, but this caused many issues with the existing code. One of the main reasons this caused issues is due to the way the Python imports worked. After implementing this, there were numerous circular import issues, which proved very difficult to fix. I spent around 1 day trying to fix circular imports and delved deep into documentation and tutorials to fix it. The solution to fixing it was to move the controller imports into `setup.py`, and running the server from that file, rather than the `app.py`. This fixed the issues as each controller could now import things such as the database and Marshmallow from `app.py` without causing circular reference errors.

**Models**

The chat feature uses 




### Front End Development

#### Web Sockets - Front end

Before the back end had been setup, I created a static version of the 'inbox' component to layout elements and work out how everything would fit together. The inbox contains 2 main sections:

1. Threads - to show all of the different conversations that the logged in user is engaged in.
2. Conversation - to show the individual messages on a specific thread, and allow the user to create and send new messages.

Once I had the component laid out, I started implementing the back end (as mentioned above). I then began implementing Socket.IO to the front end. I used the `useContext` React Hook to organise the code. There are 2 providers that power the chat:

1. SocketProvider - to handle the setup of the socket connection.
2. ThreadProvider - to handle socket events, requesting the user's existing threads and messages etc.  

#### Geolocation

Street Share makes use of the Google Maps API and Geolocation to place items on a map. The original implementation was handled by my team mate, and each item had a latitude and longitude associated with it. While this did work, it provides a poor user experience as it is uncommon to know the latitude and longitude of a street.

After the first deployment, I revisited the code to see if it was possible to use a post code instead. I looked at the geolocation services offered with the API and tested out converting postcodes to latitude and longitude.

**client/contexts/LocationProvider.js**

```js
// ...

const getLocationFromPostcode = async (postcode) => {
    try {
      const a = await Geocode.fromAddress(postcode)
      return (a.results[0].geometry.location)
    } catch (err) {

      console.log(err)
      return
    }

}
  
//...

```

With this implemented, I added a post code field to the item model, and then created a custom hook (`useMap`) which configures the map, and converts the post code of each item to latitude and longitude values, and create markers for the items.

**client/hooks/useGoogleMap.js**

```js
import React, { useState, useEffect } from "react"
import GoogleMapsApiLoader from "google-maps-api-loader"
import ReactDOMServer from 'react-dom/server';
import { getLocationFromPostcode } from '../contexts/LocationProvider'
import Geocode from 'react-geocode'

const useGoogleMap = apiKey => {
  const [googleMap, setGoogleMap] = useState(null);
  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then(google => {
      setGoogleMap(google)
    });
  }, []);
  return googleMap
};

const useMap = ({ googleMap, mapContainerRef, initialConfig, markers, markerCallback, selectedItem }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
      if (!googleMap || !mapContainerRef.current) {
        return;
      }
      const map = new googleMap.maps.Map(
        mapContainerRef.current,
        initialConfig
      )

      markers.forEach(async (marker) => {
        const location = await Geocode.fromAddress(marker.postcode)

        if(location.results.length > 0) {
          const l = location.results[0].geometry.location

          const m = new googleMap.maps.Marker({
          position: { lat: l.lat, lng: l.lng },
          map: map
          })
          const a = `<div>${marker.title}</div>`

          const infoWindow = new googleMap.maps.InfoWindow({
                content: a
          })
          m.addListener('click', (e) => {
            markerCallback(marker.id)
            infoWindow.setPosition(e.latLng);
            infoWindow.open(map);         
        })
        }
        
        
      })

      setMap(map);
    },
    [googleMap, mapContainerRef, markers]
  );
  return map;
};

export { useGoogleMap, useMap };

```

There are several improvements to be made here, but having the markers render from a post code rather than specifying latitude and longitude was a step forwards.


## Known Bugs

* On the live site, there is an issue with using the chat feature when using `https` due to some deployment issue with Heroku. It can be viewed if the user changes the url to use `http` instead. I am still working on a fix for this.
* Due to lack of time I did not have time to allow users to initiate new chats. I am hoping to release an update for this by May 2021. 
* If there are multiple items at the same postcode, they overlap and only one item can be seen. 

##Wins

* Implementing Socket.IO was a challenge, and although there are currently some issues with the functionality, it was good to work with this technology and get the real time chat feature working.
* I worked with some more advanced features of React Hooks in this project and found them to be really helpful in organising the code more effectively.


## Challenges

 * Given the scope of the MVP, it was difficult to implement all the features we wanted to in the time frame given. I have spent a little bit of time after the hand in of the project to improve some things, but am working on a larger update to finish off features.
 * There were numerous challenges implementing the live chat feature and it is a shame that it doesn't work on the live deployment yet. I hope to fix this in the next update.
 * I faced some challenges with circular import errors, but feel my understanding of the cause and ways to fix them has strengthened through working on this project. 
 * It was challenging at times to populate the relevant data for relations using Marshmallow.

## Future Improvements

* Finish off websockets functionality and ensure it works on the live site.
* Various improvements to the UI, including:
	*  updating the booking page to give feedback when a booking has been requested
	*  making the UI responsive
* Add user reviews and ratings

## Key Learnings

* I learned a lot more about the more advanced features of React Hooks. I don't think my grasp is perfect, but I see how powerful some of these features can be and look forward to working with them more in the future.
* I enjoyed working with WebSockets. The setup was frustrating at times, but it was rewarding to see the live chat feature update conversations in real time.