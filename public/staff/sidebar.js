function openNav() {
  document.body.style.backgroundColor = "white";
  document.getElementById("main_content").style.backgroundColor = "white";

  document.getElementById("openbtn").style.width = "20%";
  document.getElementById("mySidebar").style.width = "20%";
  document.getElementById("main_content").style.width = "70%";

  document.getElementById("main_content").style.marginLeft = "25%";
  document.getElementById("main_content").style.padding = "20px";
  document.getElementById("main_content").style.fontSize = "15px";
}

function closeNav() {
  document.body.style.backgroundColor = "rgb(54, 54, 54)";
  document.getElementById("main_content").style.backgroundColor = "white";

  document.getElementById("openbtn").style.width = "5%";
  document.getElementById("mySidebar").style.width = "0%";
  document.getElementById("main_content").style.width = "75%";

  document.getElementById("main_content").style.marginLeft = "15%";
  document.getElementById("main_content").style.padding = "70px";
  document.getElementById("main_content").style.fontSize = "20px";
}
