$(document).ready(function(){

$('#searchuser').on('keyup',function(e){
      let username=e.target.value;

      //make request to github
     $.ajax({
             url:'https://api.github.com/users/'+username,
             data:{
              client_id:'97b26d4e8ed886bd89fa',
              client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f'
                   }
            }).done(function(user){
             
              $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                 client_id:'97b26d4e8ed886bd89fa',
               client_secret:'f5ebe96125addf1d85c64d0c72f810011da3401f',
                sort:'created: asc',
                per_page:6
                       }
              }).done(function(repos){
                      $.each(repos,function(index,repo){
                        $('#repos').append(`
                        <div class="well mb-3 p-3">
                          <div class="row">
                             <div class="col-md-7">
                          <strong>${repo.name}</strong>: ${repo.description}
                             </div>

                             <div class="col-md-3">

                             <span class="badge badge-pill badge-primary" >Forks: ${repo.forks_count} </span>
                             <span class="badge badge-pill badge-info">Watchers: ${repo.watchers_count}</span>
                             <span class="badge badge-pill badge-success">Stars: ${repo.stargazers_count}  </span>
                             </div>
                            <div class="col-md-2">
                          <a class="btn btn-outline-warning" href="${repo.html_url}" target="_blank">Repo Page</a>
                            </div>
                        
                         </div>
                      </div>
                        `);
                      }) ;
              });




                    $('#profile').html(`<div class="card">
                    <div class="card-header">
                      <h3 class="card-title">${user.name}</h3>
                    </div>
                    <div class="card-body">


                      <div class="row">
                      <div class="col-md-3">
                      <img class= "img-thumbnail avatar" src="${user.avatar_url}">
                      <a class="btn btn-primary btn-block mb-2" href="${user.html_url}" target="_blank">View profile</a>
                      </div>

                      <div class="col-md-9">
<span class="badge badge-pill badge-primary" >Public Repos: ${user.public_repos} </span>
<span class="badge badge-pill badge-info">Public Gists: ${user.public_gists}</span>
<span class="badge badge-pill badge-success">Followers: ${user.followers}  </span>
<span class="badge badge-pill badge-danger">Following: ${user.following}</span>
<br/><br/>
<ul class="list-group list-group-flush">
  <li class="list-group-item">Company:${user.company}</li>
  <li class="list-group-item">Website/Blog:${user.blog}</li>
  <li class="list-group-item">Location:${user.location}</li>
  <li class="list-group-item">Member Since:${user.created_at}</li>
  
</ul>



</div>
                      </div>
                  
                    </div>
                  </div>
  <h1 class="mt-3">Repositories</h1>  
  <hr/>    
   <div id="repos" class="mt-2"></div>
                  `);
                   
      });
   });
});