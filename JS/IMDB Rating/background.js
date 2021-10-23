//create a context menu
chrome.contextMenus.create({
	//string to display on menu
	'title': 'Search IMDB for "%s"',
	//contexts here is selection as we want to extract the highlighted text.
	'contexts': ['selection'],
	//the event handler
	'onclick': async (context) => {
		const name = context.selectionText;
		const response = await fetch(`https://www.omdbapi.com/?t=${name}&apikey=e48e70b4`)
		const {
			Title,
			Year,
			Runtime,
			Genre,
			Actors,
			imdbRating
		} = await response.json()
		const newLine = "\r\n"
		let message = `Title : ${Title}`
		message += newLine
		message += `Year : ${Year}`
		message += newLine
		message += `Runtime : ${Runtime}`
		message += newLine
		message += `Genre : ${Genre}`
		message += newLine
		message += `Actors : ${Actors}`
		message += newLine
		message += `IMDb Rating : ${imdbRating}`
		alert(message)
	}
});

// Called when the user clicks on extension icon
chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		const activeTab = tabs[0];
		// Send a message to the active tab
		chrome.tabs.sendMessage(activeTab.id, {
			"message": "start_fetching_ratings"
		});
	});
});