# Page-Load-Completion-Observer
A utility script to observe and identify a page load's completion; implemented using the MutationObserver API.
## Use-cases
### Component loading
There are four components on the page. The load order of these components are managed based on business cases.
To validate their loading order, this script will notify first loaded component. 
### Third-party service validations
A chat box from a third-party service is used on a page. The chat box needs to be observed for interaction and potentially errors. 
This script will observe the chat box and notify if it loads or errors out.
## Thats sweet! How do I use it?
### Component mechanics (logic)
The script is given information about the page on which it is run.
For every component found in a page, the config will indicate the content(s) and type of content(s) to expect within it.
The content can be any of: 1) text 2) element 3) image
Once all the expected content(s) is/are found, the component will be assumed to have "loaded".
Once all components are loaded, the page will be declared as loaded.
### Example:
See [this](https://github.com/BharathSampathKumar/Page-Load-Completion-Observer/commit/54c808395793799587771268fc4517428723b569) with in-line descriptors.
