(function () {
 var actual_menu;
 //Menu json loader
	loadJSON(function(response) {
		actual_menu = JSON.parse(response);
		return menuElem(actual_menu.menu, document.getElementById("menu"));
	 });

	 
	 //Menu costruction and sub menu costruction
    function menuElem(obj, el) {
        for (var i = 0; i < obj.length; i++) {

            var menuElement = document.createElement("li");
			menuElement.className=obj[i].cssClass;
			menuElement.setAttribute("id", obj[i].id);
            el.appendChild(menuElement);

            var menuLink = document.createElement("a");
            menuLink.setAttribute("href", '#');
            menuLink.setAttribute("title", obj[i].description);

            var arrow = document.createElement("div");
            arrow.className = 'arrow';
            arrow.innerHTML = '>';

            var title = document.createElement("div");
            title.className = 'title '+obj[i].cssClass;
            title.innerHTML = obj[i].description;

            menuLink.appendChild(title);

            if (obj[i].leaf != true) {
                menuLink.className = 'subMenuLink';
                menuLink.appendChild(arrow);
            }

            menuElement.appendChild(menuLink);

            if (obj[i].leaf != true) {
                var subMenu = document.createElement("ul");
                subMenu.className = 'subMenu';

                var properties = {submenu : obj[i].menu, subMenuEl : subMenu, menuEl : menuElement};

                menuLink.properties = properties;

                openSubMenu(menuLink);
            }
        }
    }
	
 //submenu click costruction
    function openSubMenu(el) {
        el.addEventListener("click", function(ev){
            ev.stopPropagation();

            var subMenus = ev.target.parentNode.parentNode.parentNode.getElementsByTagName("ul");

            var links = ev.target.parentNode.parentNode.parentNode.getElementsByClassName('subMenuLink');

            for (var i = 1; i < subMenus.length; i++) {
                subMenus[i].parentNode.removeChild(subMenus[i]);
            }

            for (var i = 0; i < links.length; i++) {
                links[i].style.color = "#A36220";
            };

            this.style.color = "#DBC195";

            this.properties.subMenuEl.innerHTML = "";
            this.properties.menuEl.appendChild(this.properties.subMenuEl);
            menuElem(this.properties.submenu, this.properties.subMenuEl);
        });

    };

})();

//callback load json
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/menu.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }
 
 
 