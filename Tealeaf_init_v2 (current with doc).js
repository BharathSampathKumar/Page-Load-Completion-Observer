_satellite.pushAsyncScript(function(event, target, $variables){
    (function(){
        /** List of possible components on a page with their information
         * @global
         * @constant
         * @type {object}
         */
        const componentsInfo = {
            /*** Name of the Component
             * @type {object}
            */
            "HeroCarouselController" : {
                /*** CSS selector to grab the component 
                 * and attach the observer on
                 * @type {string}
                */
                "selector" : '[ng-controller="CarouselController"]'
                /*** A list of the different views of the component
                 * @type {Array}
                */
                , "views" : [
                    /*** Information about a view
                     * @type {object}
                     */
                    {
                        /*** Render condition of the view's elements
                         * @type {string}
                         * Possible values: "All", "Either"
                         * "All" - All elements need to be "available"
                         * "Either" - Any one of the elements can be "available"
                         */
                        "render_condition" : "All"
                        /*** List of elements that need to be searched for within the component
                         * @type {Array}
                         */  
                        , "elements" : [
                            /*** Element information
                             * @type {object}
                            */
                            {
                                /*** CSS selector to grab the element
                                 * @type {string}
                                 */
                                "selector" : ".tile-img img"
                                /*** Type of element which determines its "availability" criteria
                                 * @type {string}
                                 * Possible values : "img", "div"
                                 * "img" - An image element which is checked for load completion
                                 * "div" - A div element which is checked simply for presence
                                 */
                                , "type" : "img"
                            }
                        ]
                    }
                ]
            }
            , "ResultsGridController" : {
                "selector" : '[ng-controller="ResultsGridController"]'
                , "views" : [
                    {
                        "render_condition" : "All"
                        /** Optional list of classnames of the component to be checked
                         * for 'rendered' state before checking the elements
                         * @type {Array}
                         * All classnames should be present
                         * Can be an Array or a string
                         * A classname that is an array of classnames means either one of the names can be present
                        */
                        , "comp_class_names" : [
                            "results-wrapper"
                            /*** Either results-list or results-grid can be present on the component's classname */
                            , [
                                "results-list"
                                , "results-grid"
                            ]
                            , "results-min-height"
                        ]
                        , "elements" : [
                            {
                                "selector" : '.tiles-wrapper .grid-gutter .grid-item:not(.grid-gutter)'
                                , "type" : "div"
                            }
                        ]
                    }
                    , {
                        "render_condition" : "All"
                        , "comp_class_names" : [
                            "results-wrapper"
                            , [
                                "results-list"
                                , "results-grid"
                            ]
                        ]
                        , "elements" : [
                            {
                                "selector" : '.no-results'
                                , "type" : "div"
                            }
                        ]
                    }
                ]
            }
            , "MGMRIBookingWidgetComponent" : {
                "selector" : '[data-parsys-name="mgmri-booking-widget-component"]'
                , "views" : [
                    {   
                        "render_condition" : "All"
                        , "elements" : [
                            {
                                "selector" : ".img-placeholder img"
                                , "type" : "img"
                            }
                        ]
                    }
                ]
            }
            , "EntertainmentSearchController" : {
                "selector" : '[ng-controller="EntertainmentSearchController"]'
                , "views" : [
                    {
                        "render_condition" : "All"
                        , "elements" : [
                            {
                                "selector" : '.header-img-wrapper img'
                                , "type" : "img"
                            }
                        ]
                    }
                ]
            }
            , "EditorialController" : {
                "selector" : '[ng-controller="EditorialController"]'
                , "views" : [
                    {
                        "render_condition" : "All"
                        , "elements" : [
                            {
                                "selector" : '.image-wrapper img'
                                , "type" : "img"
                            }
                        ]
                    }

                ]
            }
            , "RoomBookingComponent" : {
                "selector" : '[data-component="BookingRoom"]'
                , "views" : [
                    {
                        "render_condition" : "All"
                        , "elements" : [
                            {
                                "selector" : '.RateCalendarPage .calendarLegend .calendar-container.calendarLegend__container'
                                , "type" : "div"
                            }
                        ]
                    }
                    , {
                        "render_condition" : "All"
                        , "elements" : [
                            {
                                "selector" : '.resort-listing-container .resort-listing-section .resort-list-item'
                                , "type" : "div"
                            }
                            , {
                                "selector" : '.resort-listing-container .small-content__container'
                                , "type" : "div"
                            }
                        ]
                    }
                    , {
                        "render_condition" : "All"
                        , "elements" : [
                            {
                                "selector" : '.room-listing-wrap .room-section .small-content__container'
                                , "type" : "div"
                            }
                            , {
                                "selector" : '.room-listing-wrap .room-wrapper .room-list-wrapper'
                                , "type" : "div"
                            } 
                        ]
                    }
                ]
            }
            , "ReservationSummaryComponent" : {
                "selector" : '[ng-controller="BookingBookAllController"]'
                , "views" : [
                    {
                        "render_condition" : "All"
                        , "comp_class_names" : [
                            "ng-scope"
                        ]
                        , "elements" : [
                            {
                                "selector" : '.main-content .grid-item.summary'
                                , "type" : "div"
                            }
                            , {
                                "selector" : ".main-content .reserve-forms:not(.ng-hide)"
                                , "type" : "div"
                            }
                        ]
                    }
                    , {
                        "render_condition" : "All"
                        , "comp_class_names" : [
                            "ng-scope"
                        ]
                        , "elements" : [
                            {
                                "selector" : '.main-content .grid-item.no-cart-items'
                                , "type" : "div"
                            }
                            , {
                                "selector" : ".main-content .reserve-forms.ng-hide"
                                , "type" : "div"
                            }
                        ]
                    }
                ]
            }
        };

        /**
         * Calls the Tealeaf DOM capture function
         */
        function captureDOM(){
            console.log('Initializing Tealeaf...');
            if (typeof window.TLT !== "undefined" && typeof window.TLT.isInitialized === "function"){
                let pageTitleEle = document.head.querySelector('title');
                var pageName = (pageTitleEle && pageTitleEle.textContent) || window.location.pathname;
                TLT.logScreenviewLoad(pageName);
            }
        }

        /**
         * Callback event for image element load
         * @param {Event} e - The Event object
         */
        function onImageLoad(e){
            e.stopPropagation();
            this.setAttribute('tt-loaded', 'true');
        }
        
        /**
         * Function to check if an element is loaded
         * @param {object} element - The element to be checked for load state
         * @param {string} type - The element type
         * @returns {boolean} The element's load state
         */
        function isElementLoaded(element, type){
            switch(type){
                case "div" :
                    if(element) return true;
                    break;
                case "img" :
                    if(element.src !== ""
                    && element.naturalWidth !== 0
                    && element.complete == true)
                        return true;
                    else if(!element.ttListenerAdded && !element.hasAttribute('tt-loaded')){
                        element.ttListenerAdded = true;
                        element.addEventListener('load', onImageLoad);
                    }
            }
            return false;
        }

        /** 
         * Grabs the element and check for load state
         * @param {object} elementData - Element information
         * @returns {boolean} The element's load state
        */
        function grabElementAndCheck(elementData){
            let compEle = this;
            const selector = elementData["selector"];
            const etype = elementData["type"];
            let ele = compEle.querySelector(selector);
            if(ele && isElementLoaded(ele, etype) == true) return true;
            return false;
        }
        
        /**
         * Checks if the class_name is contained in the component's class list
         * @param {string} class_name - Name of the class to be matched
         * @returns {boolean} - If the component's class matches class_name
        */
        function classMatchesComponentClass(class_name){
            let compClassList = this;
            return compClassList.contains(class_name);
        }

        /**
         * Checks if the class_name is contained in the component's class list
         * @param {string} class_name - Name of the class to be matched
         * @returns {boolean} - If the component's class matches class_name
        */
        function checkClassName(class_name){
            let classNameList = this;
            if(Array.isArray(class_name) == true){
                return class_name.some(classMatchesComponentClass, classNameList);
            }
            else if(typeof class_name === "string"){
                return classNameList.contains(class_name);
            }
            else
                console.error('Uncaught variable type', class_name, ' defined for component: ', compEle);
        }

        /** 
         * Checks the component's view against the information in viewData 
         * @param {object} viewData - Information about the view
         * @returns {boolean} The view's render state
        */
        function checkView(viewData){
            //console.log(viewData);
            const compEle = this,
            classNames = viewData["comp_class_names"],
            elements = viewData["elements"],
            rcond = viewData["render_condition"];
            const matchesClasses = classNames !== undefined ? (classNames.length > 0 && classNames.every(checkClassName, compEle.classList)) : true;
            if( matchesClasses ){
                if(rcond == "All" && elements.every(grabElementAndCheck, compEle) == true)
                    return true;
                else if(rcond == "Either" && elements.some(grabElementAndCheck, compEle) == true)
                    return true;
                return false;
            }
        }

        /**
         * Mutation observer callback that is fired for every components' mutation(s)
         * Checks if any of the component's view is rendered
         * If a component's view is rendered, the component has loaded and the numComponents counter is incremented
         * If all components are rendered, the function to capture the DOM is called
         * @callback
         * @param {Object[]} mutations - An array of mutations
         * @param {MutationRecord} mutations[] - The mutation info
         * @param {MutationObserver} observer - The observer object
         */
        function checkComponentMutations(mutations, observer){
            const cdata = observer.componentData;
            const cele = observer.component;
            let cviews = cdata["views"];
            if(cviews.some(checkView, cele)){
                console.log('component', cele, 'initialzed');
                componentsInitialized++;
                observer.disconnect();
            }
            if(componentsInitialized == numComponents)
                captureDOM();
        }

        /**
         * Initializes the observer on a component
         * @param {object} obsTarget - The target element to be observed
         */
        function initializeObserver(obsTarget){
            let componentInfo = this;
            let obs = new MutationObserver(checkComponentMutations);
            obs.component = obsTarget;
            obs.componentData = componentInfo;
            console.log('Initializing observer on target:', obsTarget);
            obs.observe(obsTarget, {childList: true, subtree: true, attributes: true});
            // Run check once at least, in case the page has completely loaded when the observers are initialized (and miss the DOM mutations)
            checkComponentMutations(null, obs);
        }

        /**
         * Grabs all the components with the name componentName on the page and initializes the observer on each
         * @param {string} componentName - Name of the component 
         */
        function grabPageComponents(componentName){
            const componentInfo = componentsInfo[componentName];
            const compSelector = componentInfo && componentInfo["selector"];
            const obsTargets = compSelector && document.querySelectorAll(compSelector);
            if(obsTargets) obsTargets.length > 0 && [].slice.call(obsTargets).forEach(initializeObserver, componentInfo);
            else console.error('Tealeaf_init.js error!! Cannot find component using CSS selector: '+compSelector);
        }

        /**
         * Checks if the component exists on the page
         * @param {string} componentName - Name of the component
         * @returns {boolean} If the component exists on the page
         */
        function isPageComponent(componentName){
            const compSelector = componentsInfo[componentName]["selector"];
            const components = document.body.querySelectorAll(compSelector);
            return components.length > 0 ? true : false;
        }

        /**
         * A list of the names of the components on a page
         * @global
         * @constant
         */
        const pageComponentNames = Object.keys(componentsInfo).filter(isPageComponent);
        
        /**
         * A counter to log the number of initialized components
         * @global
         */
        var componentsInitialized = 0;

        /**
         * A total of the number of components on the page
         * @global
         * @constant
         * @default 0
         */
        const numComponents = (pageComponentNames && pageComponentNames.length) || 0;
        
        /*** For every component on the page grab them and set the observers*/
        pageComponentNames.forEach(grabPageComponents);
    })();
});