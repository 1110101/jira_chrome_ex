insertCommentButton = function() {
	var button = document.createElement("a");
	button.setAttribute("id","add-tmp");
	button.setAttribute("class","toolbar-trigger");
	button.addEventListener('click',clickHandler,true);
	button.innerText = "Insert Template";

	var div1 = document.createElement("div");
	div1.setAttribute("class","aui-toolbar");

	var div2 = document.createElement("div");
	div2.setAttribute("class","toolbar-split");

	var ul = document.createElement("ul");
	ul.setAttribute("class","toolbar-group");
	var li = document.createElement("li");
	li.setAttribute("class","toolbar-item");

	div1.appendChild(div2);
	div2.appendChild(ul);
	ul.appendChild(li);
	li.appendChild(button);

	document.getElementById('comment-wiki-edit').insertBefore(div1, document.getElementById('comment') );
};

clickHandler = function(){
	document.getElementById('comment').value = "Review Comments:\n\nDecision: ";
};

addTime = function() {
	var stuff = document.evaluate('//*[@id="issuetable"]//table[contains(@id, "tt_dpb_graph_orig_")]//tr[@class="tt_graph"]/td/img', document, null, XPathResult.ANY_TYPE, null );
	
	var re = new RegExp("[0-9]{1,2}(?=h).");
	
	arr = new Array();
	
	thisNode = stuff.iterateNext();
	while (thisNode) {
		arr.push(thisNode);
		thisNode = stuff.iterateNext();	  
	}
	
	arr.forEach(function(val) {

		var parentID = findParentID(val);
		var doco = document.getElementById(parentID);
		var content = val.getAttribute("alt");

		var newdiv = document.createElement("div");
		newdiv.innerHTML = re.exec(content)[0];
		newdiv.setAttribute("style","position: absolute; background-color: rgba(220, 220, 220, 0.8); right:0px;");
		doco.parentNode.insertBefore(newdiv, doco);
	});
};

findParentID = function(val) {
	var myRe = new RegExp("tt_dpb_graph_inner_.+");
	var tmp = val;
	do {
		var id = tmp.id;
		tmp = tmp.parentNode;
	} while (!myRe.exec(id));
	return myRe.exec(id);
};

insertCommentButton();
addTime();
