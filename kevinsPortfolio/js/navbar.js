$(document).ready(function(){
var navgation = `
<div class="container">
<a href ="https://www.linkedin.com/in/kevin-nguyen-25134566/" target="_blank" class="socialIcons"><img class="socialIcons" src="img/logos/link.png" title="linkedin profile" alt="linkedin profile"></a>
<a href ="https://github.com/kevinnguyen0509/KevinsPortfolioProjects" target="_blank" class="socialIcons"><img class="socialIcons" src="img/logos/github.png" title="github profile" alt="github profile"></a> 

<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item active">
            <a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="portfolio.html">My Portfolio</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="resume.html">Resume</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">About me</a>
        </li>
    </ul>
</div>
</div> `;

document.getElementById("navbar").innerHTML = navgation;

});