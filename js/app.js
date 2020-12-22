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

	//2 possible options:
		//1 - write code in onChange event handler:
			//User Types in input
			//onChange even handler called
			//We take value from input and make api request
			//... Get response ...
			//Update 'results' piece of state
			//Component rerenders, we show list of results

		//2 - 
			//User types in input
			//onChange event handler called
			//update 'term' piece of state
			//Component rerenders (b/c of term update)
			//***We add code to detect that 'term' has changed!***
			//Make request to API ...
			//Get response
			//Update 'results' piece of state
			//Component rerenders and shows list of results

		//Big difference: 
			//1 - whether we want to make the request immediately ( in onChange handler)
			//2 - only update piece of state and only make request when we detect that 'term' has changed

		//Option 1:
			//Pro: Search instantly when onChange even triggers, simply and easy to understand
			//Con: Tightly couples 'onChange' event with search
				//need specific code that will trigger search when state is updated, not reusable
				//Can only do a search when onChange event handler fires

		//Option 2:
			//Search when 'term' piece of state changes
			//Can easily trigger a search when other parameters change!
				//If there was another piece of info that user enters we could easily trigger another search
			//Easier to extract code out into a more reusable function!
				//If we wanted to add options for search it would be very easy to add that functionality

	//Using option 2, we're going to add code to detect whether or not 'term' has changed when app rerenders

	// useEffect() hooks allows us to do this:
		//detects that our component is rerendering and detects a change



////////////////////////////////////////////////////////////////////////////////////////////////////
//The useEffect Hook

	//Allows functional components ot use SOMETHING LIKE lifecycle methods
	//We configure the hook to run some code automatically in one of three scenarios:
		//1 - When the component is rendered for the FIRST TIME ONLY
		//2 - When the component is rendered for the FIRST TIME AND WHENEVER IT RERENDERS
		//3 - When the component is rendered for the FIRST TIME AND WHENEVER IT RERENDERS AND SOME
			//PIECE OF DATA HAS CHANGED!

	//WE SHOULD NEVER SEE SOMETHING LIKE componentDidMount(){} INSIDE A FUNCTIONAL COMPONENT!

	//Now let's write some code to figure out how to employ useEffect in 1 of these 3 scenarios:

	//useEffect()
		//1st arguement is ALWAYS A FUNCTION - something that we want to do???
			//afs easier to read rather than 'function' notation

		//2nd argument: controls when our code gets executed (1/3 scenarios)
			//1) [] 		==> run at initial render
			//2) ...nothing ==> run at initial render ==> run after every rerender
			//3) [data] 	==> run at initial render ==> run after every rerender ==> run after after every
//																						rerender IF data has
//																						changed since last
//																						render


////////////////////////////////////////////////////////////////////////////////////////////////////
//Testing Execution (of useEffect)

	//in Search.js:
		const Search = () => {
		const [term, setTerm] = useState('');

		console.log('I RUN WITH EVERY RENDER');
	//1
		useEffect(() => {
			console.log('I ONLY RUN ONCE');
		}, [])};
		//this proves to use that the useEffect function runs only once
	//2
		useEffect(() => {
			console.log('I RUN AT EVERY RENDER AND AT INITIAL RENDER');
		});
		//proves that useEffect runs at every render
	//3
		useEffect(() => {
			console.log('I RUN AT INITIAL RENDER AND WHENEVER DATA HAS CHANGED');
		}, [term]);
		//same effect as above, b/c we're changing the data each time we type in the input!

	//You will see either scenarios of the [], or [data] most often

	//The array in the 2ng arg of use effect can have more than one piece of state in it!
		//The component will rerender whenever either piece is changed, not both
////////////////////////////////////////////////////////////////////////////////////////////////////
//Quiz: 3/3 GREAT JERB!!
////////////////////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////////////////////
//Async code in useEffect
	//What is the goal of this widget?
		//We want to do a search of the wikipedia api everytime the user presses a key
			//How do we do this?

			//useEffect:
			useEffect(() => {
				//make api request here w/ axios
			}, [term]);//every time 'term' changes, run the first argument

	//useEffect rule:
		//we cannot mark a the arrow function that we're passing in as async
		//3 possible solutions:
			//1 - make temporary helper function
			useEffect(  () => {
				const search = async = () => {
					await axios.get('...')	
				};
			}, [term]);
			//2 - remove temporary var and wrap in () and call w/ () @ end:
			useEffect(  () => {
				(async = () => {
					await axios.get('...')
				})();
			}, [term]);//defined function, then immediately invokes it
			//3 - use normal promises
			useEffect(() => {
				axios.get('as;ljk')
					.then((response) => {
						console.log(response.data);
					});
			}, [term]);//least often used, but sometimes easiest



////////////////////////////////////////////////////////////////////////////////////////////////////
//Executing the Request from useEffect
	//We're going w/ solution #1:
		useEffect(() => {
			const search = async () => {
				await axios.get('https://en.wikipedia.org/w/api.php', {
					params: {
						action: 'query',
						list: 'search',
						origin: '*',
						format: 'json',
						srsearch: term
					}
				});
			};
			search();
		}, [term]);
		//search results are contained in query.search[i] --> contains title and snippet



////////////////////////////////////////////////////////////////////////////////////////////////////
//Default Search Terms
	//Set results, setResults in state to empty array:
		const [results, setResults] = useState([]);
	//Assign data obj to search axios search:
		const { data } = await axios.get('https://en.wikipedia.org/w/api.php')
	//In search(), after params object:
		setResults(data);
			//this renders comp everytime results changes

	//Now when we console.log(results) we get an error:
		//This b/c we can't provide wikipedia w/ a search term that is an empty string , 2 options:
			//1 - enter a default search term
			//2 - create ternary that will run if term !== '';

		setResults(data.query.search); //returns only the search results

	//Now we need to map that results array and built out a list!




////////////////////////////////////////////////////////////////////////////////////////////////////
//LIST BUILDING!

	//undernearth Search(){}: declare renderedResults.map var that builds a list:
	const renderedResults = results.map((result) => {
		return(
			<div key={result.pageid} className="item">
				<div className="content">
					<div className="header">
						{result.title}
					</div>
					{result.snippet}
				</div>
			</div>
		); 
	});

	//And place after 'ui form' div in return statement:
	<div className="ui celled list">{renderedResults}</div>
		//There's an issue w/ html being rendered within this list!



////////////////////////////////////////////////////////////////////////////////////////////////////
//XSS ATTACKS IN REACT
	//to remove html in our list - take the html and render it out as HTML inside our app ( not text)
		//benefit --> we can then apply some css to style this text
			//whenever we display text w/ react, it's always plain text, in order to style it, we need
			//however, we have a string that we have to TURN into JSX

	//remove {result.snippet}, replace with:
		<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
			//spans are gone, but now each one it a seperate html element
			//anytime we take a string from a 3rd party, we could be introducing a security
			//hold into our application called an XXS ATTACK
				//CROSS-SITE-SCRIPTING ATTACK (accidentally pick up and render some html from and
				//unknown source --> CAN BE VERY BAD!)
					//--> untrusted source/person can run some javascript code in our account
						//must be very confident that person providing this html is trusted
			//You are opening yourself up to risk when you use this unless you are SURE the source is
			//100% trust worthy.



////////////////////////////////////////////////////////////////////////////////////////////////////
//Linking to our Wikipedia Page
	//This list looks great, but we want the user to click on a title and be taken to wikipedia article
		//We will now add this functionality:

	//GOAL: Show button on right hand side that user can click on to go to article

	//1 - Add a button underneath 'item' div in Search.js:
		<div className="right floated content">
			<a className="ui button" }>GO</a>
		</div>

	//2 - Now formate the href to interpolate page.id
		<a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>GO</a>
		//We can now visit each of these articles on wikipedia.org

////////////////////////////////////////////////////////////////////////////////////////////////////
//Only Search with a Term

	//Instead of running a search @ initial render w/ a default search term, let's formulate our code so
	//that the search is only conducted when there's a search term:
	//Replace search() with:
		if (term) {
			search();
		};


////////////////////////////////////////////////////////////////////////////////////////////////////
//Throttling API requests
	//Now, everytime our user enters a keystroke the wikipedia search is run

	//GOAL: If user types, and then w/in 500ms there is no change we will run the search
		//When user starts typing, timer is started:
			//Timer starts again every time there is a key stroke
				//Once timer hits 500ms, serach is conducted

	//Putting together the code will be slightly confusing due to the syntax...



////////////////////////////////////////////////////////////////////////////////////////////////////
//reminder on setTimeout
	//Okay, let's set up a timer to run for 500ms, find if (term) and place inside setTimeout{}:
	setTimeout(() => {
		if (term) {
			search();
		}
	}, 500);
	//***Whenever we call setTimeout we get an id and we can use that identifier to cancel it with
	//***clearTimeout(id)




////////////////////////////////////////////////////////////////////////////////////////////////////
//useEffect's Cleanup Function
	//THE ONLY THING useEffect CAN RETURN IS A FUNCTION:
		//anytime user changes the input the cleanup function is invoked automatically,
			//THEN first first block of code is executed

		//The cleanup function will be the key to cancelling the previous timer




////////////////////////////////////////////////////////////////////////////////////////////////////
//Implementing a Delayed Request

	//in Search.js, under timeoutId block, return clearTimeout(timeoutId):
		return () => {
			clearTimeout(timeoutId);
		};
		//Now we have the functionality we want by cancelling the original timeoutId;



////////////////////////////////////////////////////////////////////////////////////////////////////
//Searching on Initial Render
	//GOAL: We want to detect whether or not this is the first time this comp is being rendered:
		//If so - we will skip the timeout stuff and immediately run a search
			//Every additional time useEffect is called, we'll set up time out and run cleanup func

		//To do this, underneath setResults(data.query.search), in Search.js, add ternary statement:
			if (term && !results.length) {
				search()
			} else {
				const timeoutId = setTimeout(() => {
					if (term) {
						search();
					}
				}, 1000);

				return () => {
					clearTimeout(timeoutId);
				};

			};
		//if term and no results, run search, else set timeoutId, and search everytime there's
		//a 500ms gap in the change in term




////////////////////////////////////////////////////////////////////////////////////////////////////
//Edge Case when Clearing Out Input Form
/*In the upcoming lecture, we will be adding a second useEffect to handle debouncing. In order to resolve 
the case where a user will clear out the input-form, we need to add a conditional (similar to the issue 
described in this earlier lecture):*/
/*  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });
 
      setResults(data.query.search);
    };
    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);*/
// ^^^ completed ^^^
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
//Dropdown Architecture

	//GOAL: get more practice with useState, useEffect and introduce a new hook - useRef.

	//purpose: show some list of options, user can click on them, menu will open up with select color:
		// red, green blue

		//We want to make this reusable --> need to be able to customize the options that are provided in the
		//dropdown.

	//APP will show Dropdown, has list of options
		//--> will be provided as props to the dropdown component
			//--> Options: array of objects [{},{}]
				//--> each {} ==> label: '', value: ''

				//** why {label: 'Red', value: 'red'}?
					//When we show text to the user, we may want to say something different from 'Red',
					//maybe we want to display 'The Color Red' to the user.
					// label: is what gets displayed to the user
					//value: is how we interpret what the use selects
						//value: 'red' , is easier for us to understand what the user selected rather than
						//parsing the label (don't quite understand what he means)

	//In addition to passing down props from <App/> we are also going create some state in the <Dropdown/>
		//this.state.selection (from App) - will record what the currently selected option is:
			//will provide this down from App > Dropdown to tell it what user currently selected
				//the relationship between the component and the input field
					//we have some value specified to the input to tell it what the current value is



////////////////////////////////////////////////////////////////////////////////////////////////////
//Scaffolding the Dropdown

	//in src/components dir: create Dropdown.js, set as functional comp to return <H1>Dropdorn<div/>
	//import Dropdown @ App level in replace <Search/> with <Dropdown/>

	//Now, @ <App/> create options array and import as prop options to <Dropdown/>:
		<Dropdown options={options}/>
			//--> goal: make sure we can make use of the dropdown comp in different places in out app and
			//show a different list of options to the user
				//that's why we're defining this as props that we'll pass down.



////////////////////////////////////////////////////////////////////////////////////////////////////
//A lot of JSX

	// Extract vars from options props using.map function
	const renderedOptions = options.map((option) => {
		return (
			<div key={option.value} className="item">
		{/*extracting value / label to get key and title*/}
				{option.label}
			</div>
		);
	});

	return (
		 <div className="ui form">
		 	<div className="field">
		 		<label className="label">Select a Color</label>
		 	{/*for now hardcoding in these values, eventually want to be change to whatever we need*/}
		 		<div className="ui selection dropdown visible active">
		 			<i className="dropdown icon"></i>
		 		{/*semantic ui just uses these <i></i> as a convention, does not mean <icon/>*/}
		 			<div className="text">Select Color</div>
		 			<div className="menu visible transition">
		 				{renderedOptions}
		 			</div>
		 		</div>
		 	</div>
		 </div>
		);
	};

////////////////////////////////////////////////////////////////////////////////////////////////////
//Selection State:

	//this.state.selection: state to keep track of current selection
		//we also need a setter to setSelection, will also pass this to dropdown

	//Initialize state and set at first value in options []:
		const [selected, setSelected] = useState(options[0]);

	//Pass selected into selected prop in dropdown and set up to receive prop onSelectedChange:
		<Dropdown selected={selected} onSelectedChange={setSelected} options={options} />

	//In Dropdown.js, also set up comp to receive these props:
		const Dropdown = ({ options, selected, onSelectedChange }) => {};

	//Now we'll set up the label to print out the current selection:
		<div className="text">{selected.label}</div>
			//now 'The Color Red' is printed here since we initialized that state the default selection

	//Now, we need to make sure that whenver a user clicks on another item, that we select the user, 
	//selection instead, will call onselected change callback taht will update this.state.selected in <App/>:
		//add onClick prop to 'item' div in Dropdown.js, passing option {} from renderedOptions:
			const Dropdown = ({ options, selected, onSelectedChange }) => {
				const renderedOptions = options.map((option) => {
					return (
						<div 
							key={option.value} 
							className="item" 
							onClick={() => onSelectedChange(option)}
						>
							{option.label}
						</div>
					);
				});
			};
				//Whenver we click on a different options div:
					//we're calling onSelectedChange()
						//which is the setSelected() that will update our selected piece of state
						//APP RERENDERS , passes in newly selected option
							//App rerenders again
								//Now w/ shown newly selected property inside that containment div



////////////////////////////////////////////////////////////////////////////////////////////////////
//Filtering the Options List:
	//Let's make sure that whatever it the currently selected option doesn't show up as an additional
	//option in the dropdown list:
		//Dropdown.js, renderedOptions.map() statement, see if currently selectedOption is the option that we're
		//iterating over:
			if (option.value === selected.value) {
				return null;
			}



////////////////////////////////////////////////////////////////////////////////////////////////////
//Hiding and Showing the Options List:
	//Make sure we can open and close the <Dropdown/>, can toggle open, and list will close when option
	//selected
		//We could do this conditionally - if (active && !option){keep open}
			//this would make our dropdown look strange, so closing the list isn't the solution

		//Better way: apply or remove a list of css classes
			//in Dropdown.js remove classes: "visible transition" and "visible active":
				//this is how it's supposed to look closed
					//--> we want to toggle to existence of these classes - how can we do this?
						//Add new piece of state to comp to keep track or open or closed


		//in Dropdown.js, 1st line of Dropdown = () => {}: initialize open, setOpen w/ useState(false):
			const [open, setOpen] = useState(false);
				//don't forget to import useState!

		//Add onClick handler to 'ui selection dropdown' div, calling setOpen nad pass it the opposite 
		//value of open and interpolate 'visible active' classes w/ string template and ternary to set
		//classes or '':
		 <div className={`ui selection dropdown ${open ? 'visible active': ''}`} onClick={()=>setOpen(!open)}>
		 </div>

		 //Do the same in 'menu' div w/ classes 'visible transition':
		 <div className={`menu ${open ? 'visible transition' : ''}`}></div>
		 	//now we have the dropdown funcitonality we want

	//There is one more change we need to make, we want to be able to click outside of the the menu and have it
	//close automatically --> we'll spend a decent amount of time implementing this in the next video...




////////////////////////////////////////////////////////////////////////////////////////////////////
//Err.. WHY IS THIS SO HARD?  
	//Why is it so challenging to close the dropdown?
	//We need to several concepts in HTML, the DOM and ReactJS in order to grasp this, understanding these
	//concepts is CRITICAL:

	//w the <Dropdown/> comp, we have a React comp, whenver we create a react comp we return some jsx,
	//That JSX creates a number of elements on the screen and we can also optionally set up some event handlers
	//by providing some props to those elements
		//we've learned this a lot in this course

	/*KEEP THING TO KEEP IN MIND, DROPDOWN COMP CAN ONLY USE THAT SYNTAX */onClick={() => setOpen(!open)}/* 
	TO SET UP EVENT HANDLERS ON ELEMENTS THAT IT CREATES*/
		//--> div.ui.form, div.ui.selection
		//Issue: we're trying to click on some E that is not created by the Dropdown, and it has a hard time
		//to receive events clicking anywhere else on the screen, and that's exactly what we want to do:



////////////////////////////////////////////////////////////////////////////////////////////////////
//Reminder on Event Bubbling - Basic topic around how browser and DOM works:
	//when user clicks onClick <item.div> > Browser Clicks Event Object:
		//event Object Describes what the user clicked 	
			//--> where user's mouse is on screen, and what element user just clicked on
			//Browser hands event object to React
			//React does processing on the event
				//React provides an event object to the onClick event handler:
					//which is this:
						onClick={()=> onSelectedChange(option)}

				//Event does not stop, travels up to the parent element:
					//<div className="ui menu"> 
						//if element has clickEvent handler, it is invoked
						//Event object then travels up to the next parent element
							//In each step, browser checks to see if click event handler:
								//authomatically invoked
				//--> this process is called EVENT BUBBLING

				//WE CAN SEE THIS BE LOOKING AT CURRENT BEHAVIOR OF OUR <DROPDOWN/>
					//What happens when user clicks item?
						//We only update the current selected item
							//There nothing about closing the dropdown,
							//But it's closed when we select something, why is that?
								//--> event bubbling triggers parent element onClick event handlers
								//and eventually reaches on that closes the dropdown




////////////////////////////////////////////////////////////////////////////////////////////////////
//Applying What We've Learned

	//What We've Learned so Far:

	//The Dropdown needs to detect a click event on ANY ELEMENT besides the one it created
		//If user clicks anywhere outside Dropdown, we need to detect that click

	//The Dropdown has a hard time setting up event handlers on elements that it does not create
		//Not impossible but a little bit challenging
	//Event bubbling is a thing
		//It exists, if we click on something it will bubble up our DOM structure

	//OUR SOLUTION:
		//How our Dropdown set up an manual event listener set on teh body element,
			//Any time user clicks on any element it will bubble up to the body

	//What do we mean by 'manual event handler' ??
		//In browser console: document.body.addEventListener('click', ()=> console.log('CLICK!!!'));
			//Now anywhere we click outside the dropdown we see this console.log()
				//(You learned this week one in GA SEI)

	//NEXT TIME: How do we get the dropdown component to set up an event listener?




////////////////////////////////////////////////////////////////////////////////////////////////////
//Binding an Event Handler
	//How do we get the dropdown component to set up an event listener?

	//Set up a useEffect hook inside our our dropdown, and set up an event listener to listen to that body 
	//element
		//import useEffect to Dropdown.js
		//call useEffect w/ [] as 2nd arg:
		useEffect(() => {
			document.body.addEventListener('click', () => {
				console.log('CLICK!');
			})
		}, []);
				//Now everytime we click we see that console.log

		//Replace console.log w/ setOpen(false);
			//this doens't work as we expect however...
				//my issue, I cannot open the dropdown at all with this code, different from instructor's




////////////////////////////////////////////////////////////////////////////////////////////////////
//Why Stay Open?!
	//To fix this problem we want to see what the onClick handlers are being called, to see this we will
	//add a console.log to each onClick event handler:
		//ORDER IS THIS:
			//1 - BODY (only one wired up w/ addEventListener === ALWAYS FIRST)
				//2 - ITEM
					//3 - DROPDOWN

			//1 - setOpen(false) called - in theory closes dropdown
			//2 - click on Item - s
			//3 - dropdown - setOpen(!open) === we're taking opposite value of open here, so what we're
				//doing it we're taking the false value of open and flipping it to true
					//it closes for a fraction of a second then reopens b/c of this value



////////////////////////////////////////////////////////////////////////////////////////////////////
//Which Element was Clicked?
	//2 scenarios we need to worry about:
		//1 - User clicks on an element that is created by Dropdown comp
			//--> if user clicks on one of these elements, then we probably DON'T want the body 
				//to open/close the dropdown

		//2 - User clicks on any element BESIDES the ones created by the Dropdown
			//--> If user clicks on any of these elements, we DO WANT THE BODY EVENT LISTENER TO CLOSE
				//THE DROPDOWN

	//SOLUTION: INSIDE THIS EVENT LISTENER WE WANT TO ADD CODE TO DECIDE WHETHER OR NOT TO CLOSE THE DROPDOWN
	//BASED UPON WHICH ELEMENT WAS CLICKED:
		//figure what element was clicked
			//decide if that element was inside the dropdown

	//GOAL: useRef to get ref to element inside dropdown to decide whether or not E clicked on was contained in
	//div w/ classname 'ui form'





////////////////////////////////////////////////////////////////////////////////////////////////////
/*Important Update for React v17
In the next lecture at about 2:32 in the video, an important fix is shown to resolve an issue caused by 
the changes React v17 makes to events.

Many students have been skipping or missing this fix, so I will share it here as well:*/
if (ref.current.contains(event.target)) {

/*should be:*/
if (ref.current && ref.current.contains(event.target)) {

/*Here is the full useEffect Hook code from the "Making Use of useRef" lecture:*/
  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
 
      setOpen(false);
    });
  }, []);
 
/*Here is the full useEffect Hook code from the refactor in the "Body Event Listener Cleanup" lecture:*/
  useEffect(() => {
    const onBodyClick = (event) => {
     if (ref.current && ref.current.contains(event.target)) {
        return;
      }
 
      setOpen(false);
    };
 
    document.body.addEventListener('click', onBodyClick);
 
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////////////




  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //Making use of useRef:


 	//Import useRef and declare as const var called ref:
  		const ref = useRef();

	//and add as ref to 'ui form' div in return statement:
		<div ref={ref} className="ui form"></div>

	//How when Dropdown is rendered we can get a reference to that div by making use of ref.current
		//in document.body.addEventListner set up conditional to return early if ref contains event.target:
		document.body.addEventListener('click', (event) => {
			if (ref.current.contains(event.target)) {
				return;
			}
			setOpen(false);
		});//if option is contained in the dropdown, close the menu
				//otherwise setOpen to false




////////////////////////////////////////////////////////////////////////////////////////////////////
//Body Event Listener Cleanup
	//We're going to add code to export default statement to toggle visibility of <Dropdown/> entirely:
		//In App.js, below selected, setSelected:
			const [showDropdown, setShowDropdown] = useState(true); 
			//initializing showDropdown with initial value of true means we show dropdown

		//Add button w/ onClick prop and text toggle dropdown, call setShowDropdown w/ opposite of current
		//value:
			<button onClick={() => setShowDropdown(!showDropdown)=> }>Toggle Dropdown</button>

		//Wrap Dropdown in {} and based on showDropdown conditionally render entire component:
		{showDropdown ? 
				<Dropdown 
							selected={selected} 
							onSelectedChange={setSelected} 
							options={options} 
				/> : null
		}//if showDropdown(true) then render <Dropdown/> else render nothing


		//Now, when we test this we get this error: TypeError: Cannot read property 'contains' of null
		//Here's what's happening, in document.addEventListener{}:
			if (ref.current.contains(event.target)) {
				/*ref.current is being read as null, b/c we no longer have an element to refer to*/
				return;
			}

			//This element below goes away - and there's no longer a ref:
			<div ref={ref} className="ui form"></div>

			//How do we fix this?
				//Turn off manual event listener, will use cleanup function from useEffect:
					//use it to NOT call the event listener:
					useEffect(() => {
						const onBodyClick = (event) => {
							if (ref.current.contains(event.target)) {
								return;
							}
							setOpen(false);
						};
						document.body.addEventListener('click', onBodyClick );
						return () => {
							document.body.removeEventListener('click', onBodyClick);
							/*this removes the event listener and prevents it from being called*/
						};
					}, []);

					

////////////////////////////////////////////////////////////////////////////////////////////////////
//The translate Widget

	//1 - User will enter in text
	//2 - Select language
	//3 - Translate the text
	//4 - Render translation below on screen 

	//We will create a few different components, none of this code will be inside <App/>
		//Translate comp
			//Will show instance of dropdown, that will allow user to select the language
			//Will also show a convert component:
				//Convert: takes in text, current language and does the translation
					//We will not work about convert too much right now

			//Options: list of different language that user can select
				//an array of objects, each obj w/ label and value:
				const options = [
					{label: 'Afrikaans', value: 'af'};
				];

			//Will pass options down as a prop into <Dropdown/> so user can select one

			//Will also pass down currentlySelectedLanguage and setLanguage as callback
				//will be 100% same as what we did in <Dropdown/> in App.js



////////////////////////////////////////////////////////////////////////////////////////////////////
//Scaffolding the Translate Component


////////////////////////////////////////////////////////////////////////////////////////////////////
//Adding the Language Component


////////////////////////////////////////////////////////////////////////////////////////////////////
//Understanding the Convert Component