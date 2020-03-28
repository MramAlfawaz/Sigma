module.exports = (request, response, next) => {
    // if session not exist redirect user to signin  
    if(!request.user){
          response.redirect("/auth/signin");
          // if user in next
      } else {
        next();
      }
  };
  