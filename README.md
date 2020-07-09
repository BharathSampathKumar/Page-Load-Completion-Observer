# Page-Load-Completion-Observer
A script to observe and identify a page load's completion; implemented using the MutationObserver API
The script is given information about the page on which it is run.
For every component found in a page, the config will indicate the content(s) and type of content(s) to expect within it.
The content can be any of: 1) text 2) element 3) image
Once all the expected content(s) is/are found, the component will be assumed to have "loaded".
Once all components are loaded, the page will be declared as loaded.
