////////////////////////////////////////////////////////////////////////////////////////////////////
//THE HOOKS SYSTEM

//useState --> Function that lets you use STATE in a functional component

//useEffect --> Function that lets you use something like lifecycle methods in a functional component

//useRef --> Function that lets you create a 'ref' in a functional component

	//Hooks are a way to write reusable code, instead of more classic techniques like inheritance.

//Primitive Hooks - 10 functions that are included in react to give more function to functional components
	//--> useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandle, 
	//--> useLayoutEffect, useDebugValues

		//To get started we will make use of these hooks to understand them then
			//--> eventually we'll make Custom Hooks
				//--> will reuse some of the primitive hooks from React



////////////////////////////////////////////////////////////////////////////////////////////////////
//IMPORTANT NOTE (9-3-2020)

/*There appears to be a missing video that aimed to describe what will be built over the next few sections 
and start the app generation. We hope to have a replacement video recorded and posted sometime soon.

To summarize what was to be in this lecture, we will be building a Widget application that will include 
multiple components. These components will be:

An Accordion component

A Wikipedia API search component

A Dropdown item selection component

A Google Translate API component

We will then wrap up the Widgets application by building our own navigation using JS and React without a 
third-party library like React Router. This will be used to navigate between the different widget components 
that were built.

Before continuing on to the next lecture, make sure to generate the project by running the following:

npx create-react-app widgets*/
////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////
//App Architecture
	//We should have two components:
		//1 - App component - coordinates / governs all of our information
			//Items prop created here and passed down as a prop to the accordion

		//2 - Accordion component - in charge of showing all content from wireframe
			//Accordion will decide which set of answers/questions to show on screen based upon item prop

			//Items Prop: will be an array of objects: [{},{}]
				//{title: '', content: ''} --> w/ each object containing props title & content

		//What pieces of state do we need to make this work?
			//Which question expanded and displayed to the user
				//When we click on one question it will be expanded, when another is clicked, 
				//original shrinks and new expands

				//--> therefore we need one piece of state, the index number: position of object in items []

		//Where should the active indexIndex piece of state live?
			//Chances are there are no other pieces of the app that care about this information:
			//--> rather than defining as state in app and passing down to accordion we are 
			//going to create this state in the accordion itself.
				//**b/c this information is not useful anywhere else we're using hooks to create state in
				//the functional component

		//So in src directory create index.js and App.js
			//index.js - standard boiler plate:
				import React from 'react';
				import ReactDOM from 'react-dom';
				import App from './App';

				ReactDOM.render(<App/>, document.querySelector('#root'));

			//App.js - note the export statement:
				import React from 'react';

				export default () => {
					return <h1>Widgets App</h1>
				};
				//This gives us basic content on screen w/ no errors



////////////////////////////////////////////////////////////////////////////////////////////////////
//Communicating the Items Prop
	//We'll create accordion component
		//Show it in the app component
			//Start to create array of items and pass it down as props to the accordion
				//Make sure accordion can render something from items prop 

	//1 - create directory src/components/Accordion.js
	//2 - in Accordion.js Make funcitonal comp that returns <h1> Accordion<h1/>
	//3 - Wire up Accordion.js to App.js and replace Widget App h1 w/ <Accordion/>

	//Now we're start to create an items array, this will be hard coded, every element will be an object 
		//w/ props: title and content

	//In App.js - add items array:
		const items = [
			{
				title: 'string',
				content: 'stuff',
			},
			{
				title: 'string2',
				content: 'str2'
			}
		];
	//And add items as value to new props in <Accordion/> called 'items' 
		<Accordion items={items}/>

	//Accordion.js - receive list of items, and return array's length:
		const Accordion = ({ items }) => {
			return <h1>{items.length}</h1>
		};



////////////////////////////////////////////////////////////////////////////////////////////////////
//Building and Styling the Accordion

	//map over items array to return some jsx (in Accordion.js):
	const Accordion = ({ items }) => {
		const renderedItems = items.map( item => {
			return (
				<div key={item.title}>
					<div className="title active">
						<i className="dropdown icon"></i>
						{item.title}
					</div>
					<div className="content active">
						<p>{item.content}</p>
					</div>
				</div>
			); 
		});
		return (
			<div className="ui styled accordion">
				{renderedItems}
			</div>
		);
	};
	//Now we have an issue: semantic ui is placing a double border in the top margin of the top div
		//to solve we'll use a React.Fragment instead of the div:
			<React.Fragment key={item.title}/>
			//React.Fragment makes this just a container w/ two divs inside of it, not an element itself.



////////////////////////////////////////////////////////////////////////////////////////////////////
//Helper Functions in Function Components

	//We need to detect whenver someone clicks on these titles,
		//--> Add onClick event handler to the title
			//--> in Accordion.js, in div below fragment add onClick prop:
				 <div onClick={ () => console.log('Title clicked') }></div>

	//Now we want to keep track of the index that was clicked:
		//add index as the 2nd arg in the map
			const renderedItems = items.map((item, index) => {};

			//and add index to console log in onClick method in div:
			<div onClick={ () => console.log('Title clicked: ', index) }></div>
			//index is a built in arg in the .map() function, returns the index
				//*** maybe this onClick callback will have a decent amount of code in it, could get mess inline
					//--> we could use a helper function to do this for use instead of doing it all inline.

		//Add helper function onTitleClick=(index)=>{} to Accordion.js:

		//Call helper function in onClick div:
		<div onClick={()=> onTitleClick(index)}></div>
			//*** we need this arrow function still here b/c other wise it will call the method the second
			//***the page is rendered.

////////////////////////////////////////////////////////////////////////////////////////////////////
//Introducing useState

	//For now, we're trying to keep track of the index that user clicked on, and print it on screen.
	//We'll do this using the HOOKS SYSTEM in A FUNCTIONAL COMPONENT, the steps are the same as in classes:
	//First import useState with react:
		import React, { useState } from 'react';
		//1 Initialize State:
			const [activeIndex, setActiveIndex] = useState(null);

		//2 Helper Method that would let us know when the user clicked on a title that'd update state:
			const onTitleClick = (index) => {
				setActiveIndex(index);
			};

		//3 Reference piece of state in the render method
			return <h1>{activeIndex}</h1>;



////////////////////////////////////////////////////////////////////////////////////////////////////
//Understanding the useState HOOK

	//useState is a react primitive hook that is avialable to use
		//--> let's us use state in a functional component

		//Whenever we call useState we must initialize w/ this strange syntax:
			const [activeIndex, setActiveIndex] = useState(null);
			//syntax is called array destructuring:
				//--> identical to object destructuring, shortcut to get access to e's inside an array

			//example:
				const colors = ['red', 'green'];
				const [firstElement, secondElement] = colors;
				//this destructures the array 
					//-->assignes the first element's value to a var named fistElement
					//-->assignes the first element's value to a var named second

			const [activeIndex, setActiveIndex] = useState(null);
			//whenever we call useState() we get an array with two elements in side of it
				//--> state = [activeIndex: null, setActiveIndex: null]

			activeIndex //--> first arg is the variable that we're going to call our piece of state
			setActiveIndex //--> function that we'll use to set and change our piece of state,
				//--> whenever we call setActiveIndex component will rerender, and change state
					//*** these variables are not special, we can call them whatever we want.

							//Class Components 								Function Components

	//Initialization: 		state={activeIndex: 0}				-->			useState(0);
	//Reference:  			this.state.activeIndex 				-->			activeIndex;	
	//Updates: 				this.setState({activeIndex: 10}) 	-->			setActiveIndex(10);

		//Confusing: w/ class component we can easily define and change multiple piece of state @ the same time

	//Setting multiple pieces of state in function components (Initialization):
		const [activeIndex, setActiveIndex] = useState(0);
		const [term, setTerm] = useState('');

	//Referencing multiple pieces of state in function components (Reference):
		active Index, term;

	//Updating multiple pieces of state in function components (Updates):
		setActiveIndex(10), setTerm('buildings');

////////////////////////////////////////////////////////////////////////////////////////////////////
//Setter Functions

	//We depend on setter functions to set/change the value of state in functional components
		//As soon as we call a setter function the entire component will rerender
			//--> go up to top an execute entire functional component again
				//--> after setter is called, default value in initialization is deleted



////////////////////////////////////////////////////////////////////////////////////////////////////
//Expanding the Accordion
	//ActiveIndex will change over time, value will change based on user input
		//--> setActiveIndex(activeIndex) called means component will be rendered again

	//So how do we expand/shrink this component?
		//'active' classnames --> we need to compare the index of the 'active' div and compare
		//it to the activeIndex piece of state, and check to see if they're ===
			//if === add class name of 'active' to div\

			//to implement, Accordion.js, under renderedItems declaration:
				const active = (index === activeIndex) ? 'active' : '';
					//if index = activeIndex active var === 'active', else var === '';

			//then interpolate the value in the return statement:
				<div className={`title ${active}`}></div>
				<div className={`content ${active}`}></div>

			//remove <h1> @ bottom return statement:




////////////////////////////////////////////////////////////////////////////////////////////////////
//Coding Challenge - Build Counting App

	//Goal: have button displayed, and current count display
	//By default: have current count displayed as 0.

/*	UseState Exercise
Let's test your knowledge of useState by making a classic counter component.

Your app should show Current Count: 0 when it first starts up.  Increment this number by one every time 
a user clicks on the button.

Here's what you'll need to do:

Call useState at the top of the App component.  Remember to provide a default starting value for your 
piece of state.  For this app, provide a default value of 0

When you call useState you get back a state value and a setter.  Call the setter inside of onButtonClick 
and provide a new value for your piece of state

Make sure your H1 element displays the value of your counter piece of state!
  */

	import React from 'react';
	// Don't modify this line. It is here to make React
	// work correctly in this exercise environment.
	const useState = React.useState;
	// don't change the Component name "App"
	export default function App() {
	    const onButtonClick = () => {  
	    };  
	    return (
	        <div>
	            <button onClick={onButtonClick}>Click Me!</button>
	            
	            <h1>Current Count:</h1>
	        </div>
	    );
	};

	//YOUR SOLUTION: CORRECT ON FIRST TRY
	import React from 'react';
	// Don't modify this line. It is here to make React
	// work correctly in this exercise environment.
	const useState = React.useState;
	// don't change the Component name "App"
	export default function App() {
	    const [count, setCount] = useState(0);
	    
	    const onButtonClick = (count) => {
	        setCount(count + 1);
	        return (
	            <div>Current Count: {count}</div>
	        );
	    };
	    return (
	        <div>
	            <button onClick={()=>onButtonClick(count)}>Click Me!</button>
	            
	            <h1>Current Count: {count}</h1>
	        </div>
	    );
	};



////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating Additional Widgets
	//All the Accordion really does is contain a bunch of differnet mini apps or widgets
		//We will make several other widgets:
			//search widget:
			//drop down widget:
			//translate widget:

		//We will wire them all together w/ some navigation



////////////////////////////////////////////////////////////////////////////////////////////////////
//The Search Widget Architecture

	//We're using the wikipedia api to conduct a search, and display the results on the page
		//we want to render the title, and summary of each acticle:

	//How to use the wikipedia api
		//no api keys needed, just the url request string below:
			//en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=SEARCHTERM
				//--> returns JSON data
					//--> from this we want to return title, pageid and snippet

	//B/c we're using a functional component the state here will be entirely self contained:
		//User will be able to enter a search term
		//Term will trigger function which updates internal state
		//internal state will be interpolated as a string into a wikipedia api search



////////////////////////////////////////////////////////////////////////////////////////////////////
//Scaffolding the Widget
	//create Search.js in src/components directory
	//make Search a functional component that returns a div w/ the text Search
	//comment out accordion import and replace accordion comp w/ search comp @ app level



////////////////////////////////////////////////////////////////////////////////////////////////////
//Text Inputs with Hooksd
	//Let's create this text input:

	//in Search.js:
		return(
			<div>
				<div className="ui form">
					<div className="field">
						<label>Enter Search Tern</label>
						<input onChange={} value={} type="text" className="input"/>
		 			</div>
				</div>
			</div>
		);

	//Now we need to create a piece of state that will keep track of the value in <input/>
		const [term, setTermn] = useState('');
		//even though we're using HOOKS the EXACT SAME METHODS APPLY:
			<input onChange={e => setTerm(e.target.value)} value={term} className="input"/>



////////////////////////////////////////////////////////////////////////////////////////////////////
//When do we search?
	//Where are we going to write the code to make the search request?