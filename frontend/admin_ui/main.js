var donate = document.querySelector(".donate");
var outModal = document.querySelector(".modal-container")
var outModal2 = document.querySelector(".skip a")
var search = document.querySelector(".search");
var start = document.querySelector(".btn-signup");
donate.onclick = function(){
    document.querySelector(".modal").style.display ='block';
    document.querySelector(".modal-content").style.display ='block';

}
outModal2.onclick = function(){
    document.querySelector(".modal").style.display ='none';
    document.querySelector(".modal-content").style.display ='none';

}

search.onclick = function(){
    document.querySelector(".input-search").style.display ='block';
}
start.onclick = function(){
    document.querySelector(".modal").style.display ='none';
    document.querySelector(".modal-login-signup").style.display ='none';
    alert("BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG")
}



var apiCouses = 'http://localhost:3000/courses'

function start1(){
 
      getCouses(function getCouses(couses){
          rederCouses(couses);
      });
  
     
  
}

start1();

function getCouses(callback){
    var a;
   fetch (apiCouses)
      .then(function(respon){
          return respon.json();
      })
      .then(callback)
    
}

function rederCouses(couses){
    var listCouse = document.querySelector('#content');
    var htmls = couses.map(function(couses){
        return `
        <style>
        .pic${couses.id} {
            background-image: url(../${couses.backGround});
            border-radius: 5px;
            
          }
          .pic-tour {
            padding-top: 100%;
            background-position: center;
            background-repeat: no-repeat;
            overflow: visible;
            background-size: 100%;
          }
          .pic-tour,.pic${couses.id} {
              background-size: cover;
            background-position: center;
          }
        </style>
        <div class="col l-4 m-12 c-12">
        <div class="layout-tour">
            <div class="pic-tour pic${couses.id}">
            </div>
           
            <div class="Title-tour">
                <h4>${couses.name}</h4>
                <h5>${couses.description}</h5>
            </div>

        </div>
    </div>
        `
        
    })
    listCouse.innerHTML = htmls.join('');
}
