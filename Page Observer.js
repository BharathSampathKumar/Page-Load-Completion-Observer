window.mutationRecords = window.mutationRecords || [];

function logMutation(mutation){
    var mutationLog = "";
    const type = mutation.type;
    switch(type){
    case "childList" :
        console.log('Child mutation');
        mutationLog += 'Child node(s) ';
        let addednodes = mutation.addedNodes
        , removednodes = mutation.removedNodes;
        if(addednodes && addednodes.length > 0){
        mutationLog += 'added';
        [].slice.call(addednodes).forEach(initObserver);
        } 
        else if(removednodes && removednodes.length > 0) mutationLog += 'removed';
        break;
    case "attributes" :
        console.log('Attribute mutation');
        mutationLog += 'Attribute changed';
        break;
    case "characterData" :
        console.log('CDATA mutation');
        mutationLog += 'Character data changed';
        break;
    default :
        console.log('unhandled type: '+type);
    }
    window.mutationRecords.push({"description" : mutationLog, "target" : mutation.target});
}

function onElementMutations(mutations){
    [].slice.call(mutations).forEach(logMutation);
}

function initObserver(element){
    if(element.nodeType == Node.ELEMENT_NODE){
    var obs = new MutationObserver(onElementMutations);
    obs.observe(element, {attributes: true, childList: true, characterData: true});
    }
}

var intvl_id;
function grabBodyElements(){
    let bookingComp = document.querySelector('[data-component="BookingRoom"]');
    if(bookingComp){
    clearInterval(intvl_id);
    initObserver(bookingComp);
    }
}
intvl_id = setInterval(grabBodyElements);