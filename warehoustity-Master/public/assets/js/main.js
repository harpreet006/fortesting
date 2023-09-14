
var toggleclass = document.getElementsByClassName("toggle-class");
var gettoggleclassnumber = "";
for (i = 0; i < toggleclass.length; i++) {
    gettoggleclassnumber += toggleclass[i].addEventListener("click", getclassnumber);
    function getclassnumber(){
        gettarget = this.getAttribute("data-target");
        getclass = this.getAttribute("data-toggle-class");
        if(this.getAttribute("data-this-toggle-class") == this.getAttribute("data-this-toggle-class")){
            this.classList.toggle(this.getAttribute("data-this-toggle-class"));
        }else{
            
        }
        if(gettarget.slice(0,1) == "."){
            getTarget = gettarget.slice(1,);
            for (i = 0; i < toggleclass.length; i++){
                document.getElementsByClassName(getTarget)[i].classList.toggle(getclass);
            }
        }else if(gettarget.slice(0,1) == "#"){
            getTarget = gettarget.slice(1,);
            document.getElementById(getTarget).classList.toggle(getclass);
        }else{

        }
    }
  }

var addclass = document.getElementsByClassName("add-class");
var getaddclassnumber = "";
for (i = 0; i < addclass.length; i++) {
    getaddclassnumber += addclass[i].addEventListener("click", getclassnumber);
    function getclassnumber(){
        gettarget = this.getAttribute("data-target");
        getaddtarget = this.getAttribute("data-add-target");
        getclass = this.getAttribute("data-add-class");
        getaddclass = this.getAttribute("data-add-target-class");
        if(this.getAttribute("data-this-add-class") == this.getAttribute("data-this-add-class")){
            this.classList.add(this.getAttribute("data-add-class"));
        }else{

        }

        
        if(gettarget.slice(0,1) == "."){
            getTarget = gettarget.slice(1,);
            for (i = 0; i < addclass.length; i++){
                document.getElementsByClassName(getTarget)[i].classList.add(getclass);
            }
        }else if(gettarget.slice(0,1) == "#"){
            getTarget = gettarget.slice(1,);
            document.getElementById(getTarget).classList.add(getclass);
        }else if(getaddtarget.slice(0,1) == "."){
            getAddTarget = getaddtarget.slice(1,);
            for (r = 0; r < addclass.length; r++){
                document.getElementsByClassName(getAddTarget)[r].classList.add(getaddclass);
            }
        }else if(getaddtarget.slice(0,1) == "#"){
            getAddTarget = getaddtarget.slice(1,);
            document.getElementById(getAddTarget).classList.add(getaddclass);
        }else{
        }
    }
  }

var removeclass = document.getElementsByClassName("remove-class");
var getremoveclassnumber = "";
for (i = 0; i < removeclass.length; i++) {
    getremoveclassnumber += removeclass[i].addEventListener("click", getclassnumber);
    function getclassnumber(){
        gettarget = this.getAttribute("data-target");
        getremovetarget = this.getAttribute("data-remove-target");
        getclass = this.getAttribute("data-remove-class");
        getremoveclass = this.getAttribute("data-remove-target-class");
        if(this.getAttribute("data-this-remove-class") == this.getAttribute("data-this-remove-class")){
            this.classList.remove(this.getAttribute("data-this-remove-class"));
        }else{
            
        }
        if(gettarget.slice(0,1) == "."){
            getTarget = gettarget.slice(1,);
            for (i = 0; i < removeclass.length; i++){
                document.getElementsByClassName(getTarget)[i].classList.remove(getclass);
            }
        }else if(gettarget.slice(0,1) == "#"){
            getTarget = gettarget.slice(1,);
            document.getElementById(getTarget).classList.remove(getclass);
        }else if(getremovetarget.slice(0,1) == "."){
            getRemoveTarget = getremovetarget.slice(1,);
            for (r = 0; r < removeclass.length; r++){
                document.getElementsByClassName(getRemoveTarget)[r].classList.remove(getremoveclass);
            }
        }else if(getremovetarget.slice(0,1) == "#"){
            getRemoveTarget = getremovetarget.slice(1,);
            document.getElementById(getRemoveTarget).classList.remove(getremoveclass);
        }else{

        }

    }
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

        

